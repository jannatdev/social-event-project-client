
'use client'
import EventCard, { IEvent } from '@/components/events/event-card';
import { PagePlaceholder } from '@/components/layout/page-placeholder';


import { useState } from 'react';

interface IJoindClient{
    iniitialEvents:IEvent[]
}

const JoinedEventClient = ({iniitialEvents}:IJoindClient) => {

 
    
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
    
       
    
      
    return (
        <div className=" max-w-7xl mx-auto ">
      <PagePlaceholder
            title="Joined Events"
           
          />
     {
      iniitialEvents.length===0?(
         <p>You {"haven't"} created any events yet.</p>

      ):(
        <div className="grid md:grid-cols-3 gap-6 mb-15">
           {
        iniitialEvents.map((event:IEvent)=> <EventCard  key={event._id} event={event} onDelete={handleDeleteEvent} onUpdate={handleUpdateEvent}/>
          
         )
                
      }

        </div>
       

      )
     }
  
      
    

    </div>
    );
};

export default JoinedEventClient;