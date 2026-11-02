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


import { authClient } from "@/lib/auth-client";

import {
  
  EVENT_TYPES,
 
  isHttpUrl,
  toDateTimeLocalValue,
  validateEventForm,
  type EventFormErrors,
  type EventFormValues,
} from "@/lib/events";
import { toast } from "sonner";





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

 interface UpdateButtonProps {
  event: {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    thumbnailImageUrl: string;
    location: string;
    eventDate: string | Date;
    createdByEmail: string;
  };
}

export function UpdateButton({event}:UpdateButtonProps) {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const user = session?.user;

  const [values, setValues] = React.useState<EventFormValues>({
    
    title: event.title,
  description: event.description,
  eventType: event.eventType as EventFormValues["eventType"],
  thumbnailImageUrl: event.thumbnailImageUrl,
  location: event.location,
  eventDate: toDateTimeLocalValue(new Date(event.eventDate)),
});
  
  const [errors, setErrors] = React.useState<EventFormErrors>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isPending, setIsPending] = React.useState(false);
  
 
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
     if (Object.keys(nextErrors).length > 0) {
    return;
  }
  if (!user?.email) {
    setFormError("Please login first.");
    return;
  }
       try{
        setIsPending(true);
        const updateData = {
         ...values,
         eventDate: new Date(values.eventDate),
       };

       const res =await fetch(`http://localhost:8000/events/${event._id}`,{
        method:"PATCH",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(updateData)
    })
    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message || "Failed to update event")
    }
    toast.success("Event updated successfully!");
    router.push("/manage-events");
    router.refresh();
      

}catch (error){
    console.error(error)

 setFormError(
      error instanceof Error
        ? error.message
        : "Something went wrong")

        setFormError(message);
      toast.error('message');
    

}finally{
    setIsPending(true);

}
}   

    

    

//     if (!result.success) {
//       if (result.fieldErrors) {
//         setErrors(result.fieldErrors);
//       }
//       setFormError(result.message);
//       toast.error("Could not create event")
       
//       return;
//     }

//     toast.success( "Event created");

//     router.push("/upcoming-events");
//     router.refresh();
//   }

//   const thumbnailPreview = values.thumbnailImageUrl.trim();

  return (
    <Card className="w-full max-w-2xl overflow-hidden rounded-2xl border-0 py-0 shadow-xl shadow-primary/10 ring-1 ring-foreground/10">
      {/* Green header */}
      <div className="bg-primary px-6 py-8 text-center text-primary-foreground sm:px-8">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary-foreground/15 ring-1 ring-primary-foreground/25">
          <CalendarPlus className="size-6" aria-hidden />
        </span>
        <h1 className="mt-4 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
          Update Event
        </h1>
        <p className="mt-1.5 text-sm text-primary-foreground/85">
          Update your event details 
        </p>
        {user?.email ? (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold ring-1 ring-primary-foreground/25">
            <Snowflake className="size-3.5" aria-hidden />
            Updating as {user.email}
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
              You must be logged in to update an event.
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


           

            <Button
              type="submit"
              disabled={isPending}
              className="mt-1 h-11 w-full font-heading text-base font-extrabold shadow-sm shadow-primary/30"
            >
              {isPending ? (
                <>
                  <Spinner aria-hidden /> Updating…
                </>
              ) : (
                "Update"
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
