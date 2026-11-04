'use client';

import EventCard, { IEvent } from "@/components/events/event-card";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { authClient, useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";



export default function ManageEventsPage() {

  const {data:session}=useSession()

  const email = session?.user.email
 const [events, setEvents]=useState<IEvent[]>([])
 const [loading, setLoading]=useState(false)
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

 useEffect(()=>{
  if(!email)return;

  const getManageEvents=async()=>{
    try{
      const { data, error } = await authClient.token();

    if (error || !data?.token) {
      throw new Error("Failed to generate JWT token");
    }

    const token = data.token;

   const res = await fetch(`https://social-event-project-server.vercel.app/${email}`,{
    method:"GET",
     headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      })
  

     if (!res.ok){
      throw new Error("Failed to fetch events")
     }
     const event = await res.json()
     setEvents(event);
    }catch (error){
      console.error(error)
    }finally{
      setLoading(false)
    }
  
}
 getManageEvents()

 },[email])

  if (loading) {
    return <p className="text-center py-10">Loading events...</p>;
  }


  return (
    <div className=" max-w-7xl mx-auto -mt-15 ">
      <PagePlaceholder
      title="Manage Events"
      
    />

    {
      events.length===0 ?(
      <p>You {"haven't"} created any events yet.</p>):(
        <div className="grid md:grid-cols-3 gap-6 mb-25 ">
           {
            events.map((event:IEvent)=> <EventCard  key={event._id} event={event}
             showActions={true}
             onDelete={handleDeleteEvent} onUpdate={handleUpdateEvent} />)
          }

        </div>
      )
    }

    </div>
    
  );
}
