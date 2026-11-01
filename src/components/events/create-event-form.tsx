"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Calendar,
  CalendarPlus,
  Image as ImageIcon,
  MapPin,
  Snowflake,
  Type,
} from "lucide-react";

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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";


import { authClient } from "@/lib/auth-client";
import { createEvent } from "@/app/create-event/actions";
import {
  DESCRIPTION_MIN_LENGTH,
  EVENT_TYPES,
  TITLE_MIN_LENGTH,
  isHttpUrl,
  toDateTimeLocalValue,
  validateEventForm,
  type EventFormErrors,
  type EventFormValues,
} from "@/lib/events";
import { toast } from "sonner";

const BRAND_NAME = "SheetSathi";

const initialValues: EventFormValues = {
  title: "",
  description: "",
  eventType: "",
  thumbnailImageUrl: "",
  location: "",
  eventDate: "",
};

// `Record<value, label>` so the closed select trigger shows the label.
const EVENT_TYPE_ITEMS: Record<string, string> = Object.fromEntries(
  EVENT_TYPES.map((type) => [type, type])
);

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

export function CreateEventForm() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const user = session?.user;

  const [values, setValues] = React.useState<EventFormValues>(initialValues);
  const [errors, setErrors] = React.useState<EventFormErrors>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isPending, setIsPending] = React.useState(false);
  // The native picker's `min` is set imperatively after mount so the value
  // matches the user's local clock without a server/client hydration mismatch.
  const dateInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const input = dateInputRef.current;
    if (input) {
      input.min = toDateTimeLocalValue(new Date());
    }
  }, []);

  function updateField(field: keyof EventFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear the field error as soon as the user starts typing again.
    setErrors((prev) =>
      prev[field] ? { ...prev, [field]: undefined } : prev
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const nextErrors = validateEventForm(values);
    setErrors(nextErrors);

    // Surface validation problems as a toast so they're impossible to miss.
    // if (Object.values(nextErrors).some(Boolean)) {
    //   toast.error({
    //     type: "error",
    //     title: "Check the form",
    //     description:
    //       nextErrors.eventDate ??
    //       nextErrors.eventType ??
    //       nextErrors.location ??
    //       nextErrors.thumbnailImageUrl ??
    //       nextErrors.description ??
    //       nextErrors.title ??
    //       "Please fix the highlighted fields and try again.",
    //   });
    //   return;
    // }

    setIsPending(true);
    const result = await createEvent(values);
    console.log(result)
    setIsPending(false);

    if (!result.success) {
      if (result.fieldErrors) {
        setErrors(result.fieldErrors);
      }
      setFormError(result.message);
      toast.error("Could not create event")
       
      return;
    }

    toast.success( "Event created");

    router.push("/upcoming-events");
    router.refresh();
  }

  const thumbnailPreview = values.thumbnailImageUrl.trim();

  return (
    <Card className="w-full max-w-2xl overflow-hidden rounded-2xl border-0 py-0 shadow-xl shadow-primary/10 ring-1 ring-foreground/10">
      {/* Green header */}
      <div className="bg-primary px-6 py-8 text-center text-primary-foreground sm:px-8">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary-foreground/15 ring-1 ring-primary-foreground/25">
          <CalendarPlus className="size-6" aria-hidden />
        </span>
        <h1 className="mt-4 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
          Create Event
        </h1>
        <p className="mt-1.5 text-sm text-primary-foreground/85">
          Organise a community drive on {BRAND_NAME}
        </p>
        {user?.email ? (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold ring-1 ring-primary-foreground/25">
            <Snowflake className="size-3.5" aria-hidden />
            Creating as {user.email}
          </p>
        ) : null}
      </div>

      <CardContent className="px-6 py-6 sm:px-8">
        {isSessionPending ? (
          <div
            className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground"
            role="status"
          >
            <Spinner aria-hidden /> Checking your session…
          </div>
        ) : !user ? (
          <div className="flex flex-col items-center gap-4 py-12 text-center">
            <span
              role="alert"
              className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
            >
              <AlertCircle className="size-4 shrink-0" aria-hidden />
              You must be logged in to create an event.
            </span>
            <Button
              nativeButton={false}
              render={<Link href="/login" />}
              className="h-11 px-6 font-heading font-extrabold shadow-sm shadow-primary/30"
            >
              Log in to continue
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {formError && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
                <p>{formError}</p>
              </div>
            )}

            <FormField id="title" label="Event title" error={errors.title}>
              <InputGroup className="h-10">
                <InputGroupAddon>
                  <Type aria-hidden />
                </InputGroupAddon>
                <InputGroupInput
                  className="h-full"
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. Mirpur 10 Winter Cloth Distribution"
                  value={values.title}
                  aria-invalid={errors.title ? true : undefined}
                  onChange={(event) => updateField("title", event.target.value)}
                />
              </InputGroup>
            </FormField>

            <FormField id="eventType" label="Event type" error={errors.eventType}>
              <Select
                items={EVENT_TYPE_ITEMS}
                value={values.eventType || null}
                onValueChange={(value) =>
                  updateField("eventType", (value as string) ?? "")
                }
              >
                <SelectTrigger
                  id="eventType"
                  className="h-10 w-full"
                  aria-invalid={errors.eventType ? true : undefined}
                >
                  <SelectValue placeholder="Choose an event type" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField id="location" label="Location" error={errors.location}>
              <InputGroup className="h-10">
                <InputGroupAddon>
                  <MapPin aria-hidden />
                </InputGroupAddon>
                <InputGroupInput
                  className="h-full"
                  id="location"
                  name="location"
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. Mirpur 10, Dhaka"
                  value={values.location}
                  aria-invalid={errors.location ? true : undefined}
                  onChange={(event) => updateField("location", event.target.value)}
                />
              </InputGroup>
            </FormField>

            <FormField
              id="eventDate"
              label="Event date & time"
              error={errors.eventDate}
              hint="Only future dates are allowed."
            >
              <InputGroup className="h-10">
                <InputGroupAddon>
                  <Calendar aria-hidden />
                </InputGroupAddon>
                <InputGroupInput
                  ref={dateInputRef}
                  className="h-full"
                  id="eventDate"
                  name="eventDate"
                  type="datetime-local"
                  value={values.eventDate}
                  aria-invalid={errors.eventDate ? true : undefined}
                  onChange={(event) =>
                    updateField("eventDate", event.target.value)
                  }
                />
              </InputGroup>
            </FormField>

            <FormField
              id="thumbnailImageUrl"
              label="Thumbnail image URL"
              error={errors.thumbnailImageUrl}
              hint="Paste a link to a photo that represents the event."
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <InputGroup className="h-10 sm:flex-1">
                  <InputGroupAddon>
                    <ImageIcon aria-hidden />
                  </InputGroupAddon>
                  <InputGroupInput
                    className="h-full"
                    id="thumbnailImageUrl"
                    name="thumbnailImageUrl"
                    type="url"
                    autoComplete="url"
                    placeholder="https://..."
                    value={values.thumbnailImageUrl}
                    aria-invalid={errors.thumbnailImageUrl ? true : undefined}
                    onChange={(event) =>
                      updateField("thumbnailImageUrl", event.target.value)
                    }
                  />
                </InputGroup>

                {isHttpUrl(thumbnailPreview) ? (
                  <div className="relative h-16 w-full shrink-0 overflow-hidden rounded-lg ring-1 ring-foreground/10 sm:w-28">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </FormField>

            <FormField
              id="description"
              label="Description"
              error={errors.description}
              hint={`Share what volunteers should know — at least ${DESCRIPTION_MIN_LENGTH} characters.`}
            >
              <Textarea
                id="description"
                name="description"
                rows={5}
                minLength={DESCRIPTION_MIN_LENGTH}
                placeholder="What is this event about? What should volunteers bring or expect?"
                value={values.description}
                aria-invalid={errors.description ? true : undefined}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
              />
            </FormField>

            <p className="text-xs text-muted-foreground">
              Titles need at least {TITLE_MIN_LENGTH} characters. Your email is
              saved with the event so you can manage it later.
            </p>

            <Button
              type="submit"
              disabled={isPending}
              className="mt-1 h-11 w-full font-heading text-base font-extrabold shadow-sm shadow-primary/30"
            >
              {isPending ? (
                <>
                  <Spinner aria-hidden /> Creating event…
                </>
              ) : (
                "Create Event"
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
