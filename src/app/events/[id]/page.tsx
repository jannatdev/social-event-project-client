import EventJointCard from "@/components/events/event-joined-card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface Params{
  params:{
    id:string
  }
}
const EventDetailsPage = ({ params }: Params) => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading event details...</p>
        </div>
      }
    >
      <EventDetailsContent params={params} />
    </Suspense>
  );
};
const EventDetailsContent = async({params}:Params) => {
  const {id} =await params

  const res = await fetch (`https://social-event-project-server-qptb.vercel.app/events/${id}`,{
    cache:"no-store"
  })

   if (!res.ok) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 my-10">
        <h2 className="text-2xl font-bold">Event Not Found</h2>
        <Link href="/upcoming-events" className="text-green-600">
          Back to Events
        </Link>
      </div>
    );
  }
   const event = await res.json()

  return (
     <main className="min-h-screen bg-green-50 px-4 py-8 my-10 dark:bg-background">
      <div className="max-w-6xl mx-auto">

        <Link
          href="/upcoming-events"
          className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-green-600 dark:text-gray-300"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        <EventJointCard event={event} />

      </div>
    </main>
  );
};

export default EventDetailsPage;