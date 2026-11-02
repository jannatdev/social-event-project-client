

import { IEvent } from "@/components/events/event-card";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";



export default function ManageEventsPage() {

  const {data:session}=useSession()

  const email = session?.user.email
 const [events, setEvents]=useState<IEvent[]>([])

 useEffect(()=>{
  if(!email)return;

  const getManageEvents=async()=>{
    try{

   const res = await fetch(`http://localhost:8000/events/creator/${email}`)

     if (!res.ok){
      throw new Error("Failed to fetch events")
     }
     const data = await res.json()
     setEvents(data);
    }catch (error){
      console.error(error)
    }
  
}
 getManageEvents()

 },[email])




  return (
    <PagePlaceholder
      title="Manage Events"
      description="Create, edit and track every event you have organised on SheetSathi — with attendance counts, volunteer sign-ups and status controls in one place."
    />
  );
}
