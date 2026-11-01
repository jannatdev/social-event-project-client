import type { Metadata } from "next";

import { CreateEventForm } from "@/components/events/create-event-form";

export const metadata: Metadata = {
  title: "Create Event",
};

export default function CreateEventPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <CreateEventForm />
    </div>
  );
}
