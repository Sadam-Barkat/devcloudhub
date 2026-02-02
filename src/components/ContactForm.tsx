import { useMemo, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { services } from "@/data/services";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  message: z.string().min(1, "Message is required"),
  service: z.string().min(1, "Service is required"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceOptions = useMemo(() => services.slice(0, 4), []);

  const defaultValues = useMemo<FormValues>(
    () => ({ name: "", email: "", message: "", service: "" }),
    [],
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched",
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        let description = "Please try again in a moment.";
        try {
          const data = (await response.json()) as { error?: string; details?: string };
          description = data.details || data.error || description;
        } catch {
          // ignore JSON parse errors
        }
        toast.error("Failed to send message", {
          description,
        });
        return;
      }

      toast.success("Message sent!", {
        description: `Service: ${values.service} — I’ll reply soon.`,
      });
      reset(defaultValues);
    } catch {
      toast.error("Something went wrong", {
        description: "Please check your internet connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Name</label>
        <Input
          placeholder="Your name"
          {...register("name")}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
        <Input
          placeholder="you@example.com"
          type="email"
          {...register("email")}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Message</label>
        <Textarea
          placeholder="Tell me about your project…"
          className="min-h-[140px]"
          {...register("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Service</label>
        <Controller
          control={control}
          name="service"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger aria-invalid={!!errors.service}>
                <SelectValue placeholder="— Select a Service —" />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.map((service) => (
                  <SelectItem key={service.id} value={service.title}>
                    {service.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.service && <p className="mt-1 text-sm text-destructive">{errors.service.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
      >
        {isSubmitting ? "Sending…" : "Send Message"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting, you agree to be contacted back via email.
      </p>
    </form>
  );
}
