import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Joined Events",
};

export default function JoinedEventsPage() {
  return (
    <PagePlaceholder
      title="Joined Events"
      description="See every drive you have signed up for — with upcoming dates, locations and your volunteer slots, plus quick access to withdraw from a drive."
    />
  );
}
