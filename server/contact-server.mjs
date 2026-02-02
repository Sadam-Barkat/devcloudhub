import express from "express";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import { z } from "zod";

// Load env vars (prefer .env.local)
dotenv.config({ path: ".env.local" });
dotenv.config();

const bodySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(1, "Message is required"),
  service: z.string().min(1, "Service is required"),
});

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const app = express();
app.use(express.json({ limit: "256kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  const apiKey = process.env.SENDGRID_API_KEY;
  const senderEmail = process.env.SENDGRID_SENDER_EMAIL;
  const recipientEmail = process.env.SENDGRID_RECIPIENT_EMAIL ?? senderEmail;

  if (!apiKey || !senderEmail || !recipientEmail) {
    return res.status(500).json({ error: "Server is not configured" });
  }

  const result = bodySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid request", details: result.error.flatten() });
  }

  const { name, email, message, service } = result.data;

  console.log("Contact submission received", { name, email, service });

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
      trackingSettings: {
        clickTracking: { enable: false, enableText: false },
        openTracking: { enable: false },
      },
    });

    return res.json({ ok: true, received: { service } });
  } catch (error) {
    const statusCode = error?.code ?? error?.response?.statusCode;
    const sendGridMessage = error?.response?.body?.errors?.[0]?.message;
    console.error("SendGrid send failed", {
      statusCode,
      message: sendGridMessage,
    });

    const isDev = process.env.NODE_ENV !== "production";
    return res.status(500).json({
      error: "Failed to send email",
      ...(isDev
        ? {
            details:
              sendGridMessage ??
              (typeof error?.message === "string" ? error.message : undefined) ??
              (statusCode ? `SendGrid error (status ${statusCode})` : undefined),
          }
        : {}),
    });
  }
});

const port = Number(process.env.CONTACT_API_PORT ?? 8787);
const host = process.env.CONTACT_API_HOST ?? "127.0.0.1";
app.listen(port, host, () => {
  console.log(`Contact API listening on http://${host}:${port}`);
});
