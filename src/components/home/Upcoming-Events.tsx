import React, { useEffect, useState } from 'react';
import EventCard, { IEvent } from '../events/event-card';
import { Snowflake } from 'lucide-react';

const UpcomingEvents = () => {
     const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);

     useEffect(()=>{
        const upcomingEvents=async()=>{
            try{
                const res = await fetch ('https://social-event-project-server.vercel.app/Upcoming-events',{
                    cache:"no-store",
                })

                if(!res.ok){
                    throw new Error("Failed to fetch upcoming events")
                }

                const data = await res.json();
                setEvents(data)
            }catch(error){
                console.error(error)
            }finally{
                setLoading(false)
            }

        }
        upcomingEvents();
        
     },[])

      if (loading) {
        return <p className="text-center">Loading upcoming events...</p>;
    }
    return (
          <section className="container mx-auto py-16">
            <div className='space-y-3 text-left mb-4 mx-4'>
                 <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                     <Snowflake className="size-4" aria-hidden />
                     our Events
                 </span>
                <h2 className="text-3xl text-left font-bold mb-8">
                    Recent Upcoming Events
                </h2>

            </div>
           
            <div className=" px-4">
               

                {events.length === 0 ? (
                    <p className="text-center">
                        No upcoming events available.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <EventCard
                                key={event._id}
                                event={event}
                                onDelete={() => {}}
                                onUpdate={() => {}}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default UpcomingEvents ;