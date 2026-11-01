'use client'

import EventCard, { IEvent } from "@/components/events/event-card";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";



export default  function JoinedEventsPage() {

  const {data:session}=useSession()

  const [ events,setEvents ] = useState<IEvent[]>([])
  const[loading,setLoading] = useState(true)

  useEffect(()=>{
    const getJoinedEvents =async()=>{
       if (!session?.user?.email) return;
      try{
        const res = await fetch(`http://localhost:8000/my-joined-events/${session?.user.id}`,{
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
});

  if (loading) {
    return <p className="text-center py-10">Loading events...</p>;
  }

  return (
    <div className=" max-w-7xl mx-auto my-15">
       <h1 className="text-3xl font-bold text-green-600 mb-6">
        The Joined Events
      </h1>
     {
      events.length===0?(
         <p>You {"haven't"} created any events yet.</p>

      ):(
        <div className="grid md:grid-cols-3 gap-6 mt-6">
           {
        events.map((event:IEvent)=>  <EventCard  key={event._id} event={event} 
                />)
      }

        </div>
       

      )
     }
  
      
    

    </div>
    
  );
}
