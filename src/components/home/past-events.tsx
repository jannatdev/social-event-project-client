import { useEffect, useState } from "react";
import { History } from "lucide-react";

import EventCard, { IEvent } from "../events/event-card";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

/** Stable timestamp for sorting; invalid dates sort last. */
function toTime(value: string) {
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? Number.MAX_SAFE_INTEGER : time;
}

const PastEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://social-event-project-server.vercel.app/events", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch past events");
        }

        const data = await res.json();
        setEvents(Array.isArray(data) ? data : data.events ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Events whose day has already passed, most recent first
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const pastEvents = events
    .filter((event) => {
      const eventDate = new Date(event.eventDate);
      return !Number.isNaN(eventDate.getTime()) && eventDate < today;
    })
    .sort((a, b) => toTime(b.eventDate) - toTime(a.eventDate));

  if (loading) {
    return <p className="text-center py-10">Loading past events...</p>;
  }

  return (
    <section
      id="past-events"
      className="border-y border-green-600/10 bg-green-100/40 py-16 dark:bg-muted/20"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 space-y-3 text-left">
          <Badge className="h-auto! gap-2 rounded-full! border border-primary/25 bg-primary/10! px-4 py-1.5! text-sm! font-semibold! text-primary!">
            <History aria-hidden />
            Memories
          </Badge>

          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-bold">Past Events</h2>
            <Badge variant="secondary" className="rounded-full px-3">
              {pastEvents.length} {pastEvents.length === 1 ? "event" : "events"}
            </Badge>
          </div>

          <p className="max-w-2xl text-gray-600 dark:text-gray-300">
            Drives we have already completed across Mirpur — every sweater,
            blanket and volunteer hour counts. Relive the moments and get
            inspired for the next one.
          </p>
        </div>

        {pastEvents.length === 0 ? (
          <Empty className="border bg-white/70 py-12 dark:bg-card/70">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <History aria-hidden />
              </EmptyMedia>
              <EmptyTitle>No past events yet</EmptyTitle>
              <EmptyDescription>
                Once a drive wraps up, it will appear here so you can look back
                at the warmth we shared together.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onDelete={() => {}}
                onUpdate={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PastEvents;
