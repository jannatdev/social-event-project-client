import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Manage Events",
};

export default function ManageEventsPage() {
  return (
    <PagePlaceholder
      title="Manage Events"
      description="Create, edit and track every event you have organised on SheetSathi — with attendance counts, volunteer sign-ups and status controls in one place."
    />
  );
}
