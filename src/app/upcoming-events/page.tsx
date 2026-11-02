

"use client"
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import EventCard, { IEvent } from "@/components/events/event-card";
import { useEffect, useState } from "react";





export default  function UpcomingEventsPage() {

  

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
    return <p className="text-center py-10">Loading events...</p>;
  }


   if (upcomingEvents.length===0){

     return (
      <div className="text-center py-20 border border-dashed rounded-2xl">
        <h2 className="text-xl font-semibold text-green-600">
          No Events Found
        </h2>
        <p className="text-gray-500 mt-2 dark:text-gray-400">
          Create your first event to get started.
        </p>
      </div>
    );
  }




  return (
    <div className="bg-green-50 dark:bg-background -mt-20">
       <PagePlaceholder
      title="Upcoming Events"
      
    />

    <div className="grid md:grid-cols-3 gap-5 max-w-7xl mx-auto mb-15">
      {
         upcomingEvents.map(event=> <EventCard  key={event._id} event={event}  onDelete={() => {}} onUpdate={() => {}} />  )
      }

    </div>

    </div>
   
  );
}
