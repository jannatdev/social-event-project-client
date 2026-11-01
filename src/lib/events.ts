/**
 * Shared event helpers used by both the Create Event form (client) and the
 * `createEvent` server action, so validation rules stay identical on both
 * sides and no past date can slip through.
 */

export const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Winter Cloth Distribution",
  "Winter Blanket Distribution",
  "Blood Donation",
  "Volunteering",
  "Awareness",
  "Other",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export type EventFormValues = {
  title: string;
  description: string;
  eventType: EventType | "";
  thumbnailImageUrl: string;
  location: string;
  /** Raw value of a `datetime-local` input, e.g. "2026-11-22T10:00". */
  eventDate: string;
};

export type EventFormErrors = Partial<Record<keyof EventFormValues, string>>;

export const TITLE_MIN_LENGTH = 5;
export const DESCRIPTION_MIN_LENGTH = 20;

export function isHttpUrl(value: string): boolean {
  return /^https?:\/\/\S+$/i.test(value);
}

/** Formats a Date as a `datetime-local` input value (local time). */
export function toDateTimeLocalValue(date: Date): string {
  const pad = (part: number) => String(part).padStart(2, "0");
  return [
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    `${pad(date.getHours())}:${pad(date.getMinutes())}`,
  ].join("T");
}

/** Parses a `datetime-local` value. Returns `null` when it isn't a valid date. */
export function parseEventDate(value: string): Date | null {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function validateEventForm(values: EventFormValues): EventFormErrors {
  const errors: EventFormErrors = {};

  const title = values.title.trim();
  if (!title) {
    errors.title = "Please enter an event title.";
  } else if (title.length < TITLE_MIN_LENGTH) {
    errors.title = `Title must be at least ${TITLE_MIN_LENGTH} characters.`;
  }

  const description = values.description.trim();
  if (!description) {
    errors.description = "Please describe the event.";
  } else if (description.length < DESCRIPTION_MIN_LENGTH) {
    errors.description = `Description must be at least ${DESCRIPTION_MIN_LENGTH} characters.`;
  }

  if (!values.eventType) {
    errors.eventType = "Please choose an event type.";
  }

  const thumbnail = values.thumbnailImageUrl.trim();
  if (!thumbnail) {
    errors.thumbnailImageUrl = "Please add a thumbnail image URL.";
  } else if (!isHttpUrl(thumbnail)) {
    errors.thumbnailImageUrl = "Image URL must start with http:// or https://";
  }

  if (!values.location.trim()) {
    errors.location = "Please enter the event location.";
  }

  if (!values.eventDate) {
    errors.eventDate = "Please pick the event date and time.";
  } else {
    const date = parseEventDate(values.eventDate);
    if (!date) {
      errors.eventDate = "Please pick a valid date and time.";
    } else if (date.getTime() <= Date.now()) {
      errors.eventDate = "The event date must be in the future.";
    }
  }

  return errors;
}

export function formatEventDateLabel(value: string): string {
  const date = parseEventDate(value);
  if (!date) return value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

/** Human-readable event date (bn-BD), matching the event listing cards. */
export function formatEventDate(value: string): string {
  const date = parseEventDate(value);
  if (!date) return "To be announced";
  return date.toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Human-readable event time (bn-BD), matching the event listing cards. */
export function formatEventTime(value: string): string {
  const date = parseEventDate(value);
  if (!date) return "To be announced";
  return date.toLocaleTimeString("bn-BD", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
