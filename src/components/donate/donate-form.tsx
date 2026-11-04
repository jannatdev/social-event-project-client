"use client";

import * as React from "react";
import { HandHeart, Mail, Phone, Send, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { DONATION_TYPES } from "@/lib/donate";

type DonateFormValues = {
  name: string;
  phone: string;
  email: string;
  donationType: string;
  message: string;
};

type DonateFormErrors = Partial<Record<keyof DonateFormValues, string>>;

const initialValues: DonateFormValues = {
  name: "",
  phone: "",
  email: "",
  donationType: "",
  message: "",
};

// `Record<value, label>` so the closed select trigger shows the label.
const DONATION_TYPE_ITEMS: Record<string, string> = Object.fromEntries(
  DONATION_TYPES.map((type) => [type, type])
);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: DonateFormValues): DonateFormErrors {
  const errors: DonateFormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (values.phone.replace(/\D/g, "").length < 6) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }
  if (!values.donationType) {
    errors.donationType = "Choose what you'd like to donate.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Tell us a little more (at least 10 characters).";
  }

  return errors;
}

function FormField({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
      >
        {label}
      </label>
      {children}
      {error ? <FieldError>{error}</FieldError> : null}
      {hint && !error ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function DonateForm() {
  const [values, setValues] = React.useState<DonateFormValues>(initialValues);
  const [errors, setErrors] = React.useState<DonateFormErrors>({});
  const [sent, setSent] = React.useState(false);

  function updateField(field: keyof DonateFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear the field error as soon as the user starts typing again.
    setErrors((prev) =>
      prev[field] ? { ...prev, [field]: undefined } : prev
    );
    setSent(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      toast.error("Please fix the highlighted fields and try again.");
      return;
    }

    // No backend is wired up yet — the message is confirmed locally and the
    // team's direct contact details stay available on the page.
    setSent(true);
    setValues(initialValues);
    toast.success("Thanks! We will contact you soon.");
  }

  return (
    <Card className="w-full overflow-hidden rounded-2xl border-0 py-0 shadow-xl shadow-primary/10 ring-1 ring-foreground/10">
      {/* Green header */}
      <div className="bg-primary px-6 py-8 text-center text-primary-foreground sm:px-8">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary-foreground/15 ring-1 ring-primary-foreground/25">
          <HandHeart className="size-6" aria-hidden />
        </span>
        <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
          Contact Us to Donate
        </h2>
        <p className="mt-1.5 text-sm text-primary-foreground/85">
          Fill in the form and our team will reach out to arrange a pickup
        </p>
      </div>

      <CardContent className="px-6 py-6 sm:px-8">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {sent ? (
            <div
              role="status"
              className="flex items-start gap-2 rounded-lg border border-green-600/30 bg-green-600/10 px-3 py-2.5 text-sm text-green-700 dark:text-green-400"
            >
              <HandHeart className="mt-0.5 size-4 shrink-0" aria-hidden />
              <p>
                Message received — we will contact you within one working day.
              </p>
            </div>
          ) : null}

          <FormField id="name" label="Your name" error={errors.name}>
            <InputGroup className="h-10">
              <InputGroupAddon>
                <User aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                className="h-full"
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="e.g. Rahim Uddin"
                value={values.name}
                aria-invalid={errors.name ? true : undefined}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </InputGroup>
          </FormField>

          <FormField
            id="phone"
            label="Phone / WhatsApp"
            error={errors.phone}
            hint="We use this number to arrange the pickup."
          >
            <InputGroup className="h-10">
              <InputGroupAddon>
                <Phone aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                className="h-full"
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="e.g. +880 1700-000000"
                value={values.phone}
                aria-invalid={errors.phone ? true : undefined}
                onChange={(event) => updateField("phone", event.target.value)}
              />
            </InputGroup>
          </FormField>

          <FormField
            id="email"
            label="Email (optional)"
            error={errors.email}
          >
            <InputGroup className="h-10">
              <InputGroupAddon>
                <Mail aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                className="h-full"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                aria-invalid={errors.email ? true : undefined}
                onChange={(event) => updateField("email", event.target.value)}
              />
            </InputGroup>
          </FormField>

          <FormField
            id="donationType"
            label="What would you like to donate?"
            error={errors.donationType}
          >
            <Select
              items={DONATION_TYPE_ITEMS}
              value={values.donationType || null}
              onValueChange={(value) =>
                updateField("donationType", (value as string) ?? "")
              }
            >
              <SelectTrigger
                id="donationType"
                className="h-10 w-full"
                aria-invalid={errors.donationType ? true : undefined}
              >
                <SelectValue placeholder="Choose a donation type" />
              </SelectTrigger>
              <SelectContent>
                {DONATION_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField
            id="message"
            label="Details"
            error={errors.message}
            hint="How much, what condition, and when you are available."
          >
            <Textarea
              id="message"
              name="message"
              rows={4}
              placeholder="e.g. I have 15 sweaters and 5 blankets to donate this Saturday afternoon."
              value={values.message}
              aria-invalid={errors.message ? true : undefined}
              onChange={(event) => updateField("message", event.target.value)}
            />
          </FormField>

          <Button
            type="submit"
            className="mt-1 h-11 w-full gap-2 font-heading text-base font-extrabold shadow-sm shadow-primary/30"
          >
            Send Message
            <Send className="size-4" aria-hidden />
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Need us sooner? Call{" "}
            <a
              href="tel:+8801822990759"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              +880 1822990759
            </a>{" "}
            or email{" "}
            <a
              href="mailto:salam@sheetsathi.org"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              Info@sheetsathi.org
            </a>
            .
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
