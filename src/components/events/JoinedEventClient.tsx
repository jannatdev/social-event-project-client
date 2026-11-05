'use client'
import EventCard, { IEvent } from '@/components/events/event-card';
import { PagePlaceholder } from '@/components/layout/page-placeholder';
import { useSession } from '@/lib/auth-client';
import { Snowflake } from 'lucide-react';
import { useRouter } from 'next/navigation';


import { useEffect, useState } from 'react';

interface IJoindClient{
    
  iniitialEvents?: IEvent[];
}


const JoinedEventClient = ({iniitialEvents =[]}:IJoindClient) => {
   const{data:session, isPending}=useSession()
   const router = useRouter();

      const [ events,setEvents ] = useState<IEvent[]>(iniitialEvents)
       useEffect(() => {
    // Only send the user to /login once the session lookup has finished —
    // `session` is undefined on the very first render, so redirecting earlier
    // would bounce logged-in users away before their session arrives.
    if (!isPending && !session?.user) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return <p className="text-center py-10">Loading...</p>;
  }

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
    
       
    
      
    return (
        <div className=" max-w-7xl mx-auto ">
          <span className="inline-flex items-center gap-2 ml-140 mt-15 -mb-100 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                  <Snowflake className="size-4" aria-hidden />
                  Joined Events
       </span>

      <PagePlaceholder
            title="Joined Events"
           
          />
     {
      events.length === 0?(
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
};

export default JoinedEventClient;