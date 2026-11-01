"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { db } from "@/lib/mongodb";
import {
  parseEventDate,
  validateEventForm,
  type EventFormValues,
} from "@/lib/events";

export type CreateEventResult =
  | { success: true; message: string; eventId: string }
  | {
      success: false;
      message: string;
      fieldErrors?: ReturnType<typeof validateEventForm>;
    };

/**
 * Creates an event on behalf of the currently logged-in user. The creator's
 * email is taken from the server-side session — never from the client payload —
 * so ownership can be validated later.
 */
export async function createEvent(
  values: EventFormValues
): Promise<CreateEventResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!user?.email) {
    return {
      success: false,
      message: "You must be logged in to create an event.",
    };
  }

  const fieldErrors = validateEventForm(values);
  if (Object.values(fieldErrors).some(Boolean)) {
    return {
      success: false,
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  // Defensive re-check: never allow a past date, even if the client was bypassed.
  const eventDate = parseEventDate(values.eventDate);
  if (!eventDate || eventDate.getTime() <= Date.now()) {
    return {
      success: false,
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: {
        eventDate: "The event date must be in the future.",
      },
    };
  }

  const now = new Date();

  try {
    const result = await db.collection("events").insertOne({
      title: values.title.trim(),
      description: values.description.trim(),
      eventType: values.eventType,
      thumbnailImageUrl: values.thumbnailImageUrl.trim(),
      location: values.location.trim(),
      eventDate,
      createdByEmail: user.email,
      createdById: user.id,
      createdByName: user.name ?? null,
      createdAt: now,
      updatedAt: now,
    });

    revalidatePath("/upcoming-events");

    return {
      success: true,
      eventId: result.insertedId.toString(),
      message: `“${values.title.trim()}” has been created and will show on Upcoming Events.`,
    };
  } catch (error) {
    console.error("Failed to create event:", error);
    return {
      success: false,
      message: "Something went wrong while saving your event. Please try again.",
    };
  }
}
