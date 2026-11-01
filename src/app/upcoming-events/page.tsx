import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Upcoming Events",
};

export default function UpcomingEventsPage() {
  return (
    <PagePlaceholder
      title="Upcoming Events"
      description="See every upcoming and past winter cloth distribution drive across Mirpur — with dates, zones, target family counts and sign-up slots for volunteers."
    />
  );
}
