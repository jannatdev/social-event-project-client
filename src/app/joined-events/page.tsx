'use client'

import  EventCard, { IEvent } from "@/components/events/event-card";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { PagePlaceholder } from "@/components/layout/page-placeholder";




export default  function JoinedEventsPage() {

  const {data:session}=useSession()

  const [ events,setEvents ] = useState<IEvent[]>([])
  const handleDeleteEvent = (id: string) => {
        setEvents((prevEvents) =>
            prevEvents.filter((event) => event._id !== id)
        );
    };

    const handleUpdateEvent = (updatedEvent: IEvent) => {
    setEvents((prevEvents) =>
        prevEvents.map((event) =>
            event._id === updatedEvent._id ? updatedEvent : event
        )
    );
};
  const[loading,setLoading] = useState(true)

  const email = session?.user.email

  useEffect(()=>{
    if (!email) return;
    const getJoinedEvents =async()=>{
       
      try{
        const res = await fetch(`http://localhost:8000/events/joiningEvents/${email}`,{
    cache:"no-store"
        })
    if(!res.ok){
      throw new Error("Failed to fetch events")
      
    }
    const data = await res.json()
    ;
     setEvents(data);

   }catch (error){
    console.error(error)
   }
  finally{
    setLoading(false)
  }
}
  getJoinedEvents();
},[email]);

  if (loading) {
    return <p className="text-center py-10">Loading events...</p>;
  }

  return (
    <div className=" max-w-7xl mx-auto ">
      <PagePlaceholder
            title="Joined Events"
           
          />
     {
      events.length===0?(
         <p>You {"haven't"} created any events yet.</p>

      ):(
        <div className="grid md:grid-cols-3 gap-6 mb-15">
           {
        events.map((event:IEvent)=> <EventCard  key={event._id} event={event} onDelete={handleDeleteEvent} onUpdate={handleUpdateEvent}/>
          
         )
                
      }

        </div>
       

      )
     }
  
      
    

    </div>
    
  );
}
