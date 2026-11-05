

"use client"
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import EventCard, { IEvent } from "@/components/events/event-card";
import { useEffect, useState } from "react";
import { EVENT_TYPES, type EventType } from "@/lib/events";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Snowflake } from "lucide-react";
import Loading from "../loading";

function toTime(value: string) {
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? Number.MAX_SAFE_INTEGER : time;
}


export default  function UpcomingEventsPage() {

  

  const [ events,setEvents ] = useState<IEvent[]>([])
  const[loading,setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(()=>{
    const fetchEvents=async()=>{
      try{

      const serverUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_SERVER_URL
      if (!serverUrl) {
        throw new Error("Server URL is missing");
      }

      const res = await fetch (`${serverUrl}/events`,{
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



  // Upcoming events only, sorted ascending by date (nearest first)
   const upcomingEvents= events.filter(event=>{
    const eventDate = new Date(event.eventDate)
     const today = new Date();
  today.setHours(0, 0, 0, 0);

  return eventDate >= today;
   }
   ).sort((a, b) => toTime(a.eventDate) - toTime(b.eventDate));

  // Tab values: "All" plus every event type actually present in the list,
  // keeping the canonical EVENT_TYPES order first.
  const presentTypes = Array.from(
    new Set(
      upcomingEvents
        .map((event) => event.eventType?.trim())
        .filter((type): type is string => Boolean(type))
    )
  );
  const eventTypes: string[] = [
    ...EVENT_TYPES.filter((type) =>
      presentTypes.some((present) => present.toLowerCase() === type.toLowerCase())
    ),
    ...presentTypes.filter(
      (present) =>
        !EVENT_TYPES.some(
          (type) => type.toLowerCase() === (present as EventType).toLowerCase()
        )
    ),
  ];

  const byType = (type: string) =>
    upcomingEvents.filter(
      (event) => event.eventType?.trim().toLowerCase() === type.toLowerCase()
    );

  const renderGrid = (list: IEvent[], emptyText: string) =>
    list.length > 0 ? (
      <div className="grid md:grid-cols-3 gap-5 max-w-7xl mx-auto mb-15">
        {
          list.map(event=> <EventCard  key={event._id} event={event}  onDelete={() => {}} onUpdate={() => {}} />  )
        }
      </div>
    ) : (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        {emptyText}
      </p>
    );

    
 if (loading) {
    return <Loading/>;
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
    <div className="bg-green-50 dark:bg-background  max-w-7xl mx-auto">
       <span className="inline-flex items-center gap-2 ml-140 mt-15 -mb-100 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                  <Snowflake className="size-4" aria-hidden />
                  All Events
       </span>

    
      <div>
        
         <PagePlaceholder
      title="Upcoming Events"
      
    />

      </div>
      

    {/* Filter tabs — All + one per event type */}
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value ?? "all")}
      className="items-center -mt-25 mb-15"
    >
      <TabsList className="h-auto! w-fit flex-wrap justify-center gap-1 border-r border-green-100 rounded-full! bg-white! p-1.5! border border-green-100 shadow-sm ring-1 ring-green-600/15 dark:bg-card! dark:ring-white/10">
        <TabsTrigger
          value="all"
          className="rounded-full! px-4 py-1.5 font-semibold data-active:bg-primary! data-active:text-primary-foreground!"
        >
          All
        </TabsTrigger>
        {eventTypes.map((type) => (
          <TabsTrigger
            key={type}
            value={type}
            className="rounded-full! px-4 py-1.5 font-semibold data-active:bg-primary! data-active:text-primary-foreground!"
          >
            {type}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* All upcoming events, ascending by date (nearest first) */}
      <TabsContent value="all">
        {renderGrid(upcomingEvents, "No upcoming events right now.")}
      </TabsContent>

      {eventTypes.map((type) => (
        <TabsContent key={type} value={type}>
          {renderGrid(byType(type), `No upcoming “${type}” events right now.`)}
        </TabsContent>
      ))}
    </Tabs>

    </div>
   
  );
}
