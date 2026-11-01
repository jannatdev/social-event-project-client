'use client';


import { PagePlaceholder } from "@/components/layout/page-placeholder";
import EventCard, { IEvent } from "@/components/events/event-card";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";



export default  function UpcomingEventsPage() {

  const {data:session} = useSession()
  const currentUserId= session?.user?.id?? ""

  const [ events,setEvents ] = useState<IEvent[]>([])
  const[loading,setLoading] = useState(true)

  useEffect(()=>{
    const fetchEvents=async()=>{
      try{
         const res = await fetch ('http://localhost:8000/events',{
   cache:"no-store"
  })
  if(!res.ok){
    throw new Error("Failed to fetch error")
  }

   const data = await res.json()

console.log("API response:", data);

      setEvents(Array.isArray(data) ? data : data.events ?? []);
    

      }catch(error){
        console.error(error)
      }finally{
        setLoading(false)
      }

    }
    fetchEvents()
  },[])

 

   const upcomingEvents= events.filter(event=>{
    const eventDate = new Date(event.eventDate)
     const today = new Date();
  today.setHours(0, 0, 0, 0);

  return eventDate >= today;
   }
  )

    
     if (loading) {
    return <p>Loading events...</p>;
  }


   if (upcomingEvents.length===0){

     return (
      <div className="text-center py-20 border border-dashed rounded-2xl">
        <h2 className="text-xl font-semibold text-green-600">
          No Events Found
        </h2>
        <p className="text-gray-500 mt-2">
          Create your first event to get started.
        </p>
      </div>
    );
  }




  return (
    <div>
       <PagePlaceholder
      title="Upcoming Events"
      description="See every upcoming and past winter cloth distribution drive across Mirpur — with dates, zones, target family counts and sign-up slots for volunteers."
    />

    <div className="grid md:grid-cols-3 gap-5 max-w-7xl mx-auto mb-15">
      {
         upcomingEvents.map(event=> <EventCard  key={event._id} event={event} 
    currentUserId={currentUserId} />  )
      }

    </div>

    </div>
   
  );
}
