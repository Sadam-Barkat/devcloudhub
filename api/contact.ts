import type { IncomingMessage, ServerResponse } from "node:http";
import sgMail from "@sendgrid/mail";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(1, "Message is required"),
  service: z.string().min(1, "Service is required"),
});

type ContactRequestBody = z.infer<typeof bodySchema>;

function sendJson(res: ServerResponse, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

export default async function handler(req: IncomingMessage & { method?: string; body?: unknown }, res: ServerResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method Not Allowed" });
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const senderEmail = process.env.SENDGRID_SENDER_EMAIL;
  const recipientEmail = process.env.SENDGRID_RECIPIENT_EMAIL ?? senderEmail;

  if (!apiKey || !senderEmail || !recipientEmail) {
    return sendJson(res, 500, { error: "Server is not configured" });
  }

  const parsedBodyRaw = req.body;

  if (parsedBodyRaw == null) {
    return sendJson(res, 400, { error: "Missing request body" });
  }

  let parsedBody: unknown = parsedBodyRaw;

  // Vercel/Node handlers sometimes pass body as string
  if (typeof parsedBody === "string") {
    try {
      parsedBody = JSON.parse(parsedBody);
    } catch {
      return sendJson(res, 400, { error: "Invalid JSON" });
    }
  }

  const result = bodySchema.safeParse(parsedBody);
  if (!result.success) {
    return sendJson(res, 400, { error: "Invalid request", details: result.error.flatten() });
  }

  const { name, email, message, service }: ContactRequestBody = result.data;

  try {
    sgMail.setApiKey(apiKey);

    const subject = `New Contact Form Submission (${service}) from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`;
    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${escapeHtml(message)}</pre>
    `;

    await sgMail.send({
      to: recipientEmail,
      from: { email: senderEmail, name: "DevCloudHub" },
      replyTo: { email, name },
      subject,
      text,
      html,
      // Tracking can sometimes increase spam scores for small transactional sends.
      trackingSettings: {
        clickTracking: { enable: false, enableText: false },
        openTracking: { enable: false },
      },
    });

    return sendJson(res, 200, { ok: true, received: { service } });
  } catch (error) {
    // Don't leak provider errors to the client
    return sendJson(res, 500, { error: "Failed to send email" });
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
