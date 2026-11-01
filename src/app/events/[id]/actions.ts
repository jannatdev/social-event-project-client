"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

import { auth } from "@/lib/auth";
import { db } from "@/lib/mongodb";

export type JoinEventResult =
  | { success: true; message: string }
  | { success: false; message: string; requiresLogin?: boolean };

/**
 * Signs the currently logged-in user up for an event. The user's identity is
 * taken from the server-side session — never from the client payload — and the
 * event is re-read from the database so the join is always stored alongside
 * real event + user data.
 */
export async function joinEvent(eventId: string): Promise<JoinEventResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!user?.email) {
    return {
      success: false,
      requiresLogin: true,
      message: "You must be logged in to join an event.",
    };
  }

  if (!ObjectId.isValid(eventId)) {
    return {
      success: false,
      message: "That event could not be found.",
    };
  }

  try {
    const eventOid = new ObjectId(eventId);

    const event = await db.collection("events").findOne({ _id: eventOid });
    if (!event) {
      return {
        success: false,
        message: "That event could not be found.",
      };
    }

    const existingJoin = await db.collection("eventJoins").findOne({
      eventId: eventOid,
      joinedById: user.id,
    });
    if (existingJoin) {
      return {
        success: false,
        message: "You have already joined this event.",
      };
    }

    await db.collection("eventJoins").insertOne({
      eventId: eventOid,
      eventTitle: event.title ?? null,
      eventType: event.eventType ?? null,
      eventDate: event.eventDate ?? null,
      eventLocation: event.location ?? null,
      createdById: event.createdById ?? null,
      joinedById: user.id,
      joinedByEmail: user.email,
      joinedByName: user.name ?? null,
      joinedAt: new Date(),
    });

    revalidatePath("/joined-events");
    revalidatePath("/upcoming-events");

    return {
      success: true,
      message: `You have joined “${event.title}”.`,
    };
  } catch (error) {
    console.error("Failed to join event:", error);
    return {
      success: false,
      message: "Something went wrong while joining this event. Please try again.",
    };
  }
}

/**
 * Returns whether the current user has already joined the given event, so the
 * details page can render the joined state on load. Returns `false` for
 * logged-out visitors — the details page itself stays public.
 */
export async function getJoinStatus(
  eventId: string
): Promise<{ joined: boolean }> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!user?.id || !ObjectId.isValid(eventId)) {
    return { joined: false };
  }

  try {
    const existingJoin = await db.collection("eventJoins").findOne({
      eventId: new ObjectId(eventId),
      joinedById: user.id,
    });
    return { joined: Boolean(existingJoin) };
  } catch (error) {
    console.error("Failed to read join status:", error);
    return { joined: false };
  }
}
