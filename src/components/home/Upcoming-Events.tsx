import React, { useEffect, useState } from 'react';
import EventCard, { IEvent } from '../events/event-card';

const UpcomingEvents = () => {
     const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);

     useEffect(()=>{
        const upcomingEvents=async()=>{
            try{
                const res = await fetch ('http://localhost:8000/Upcoming-events',{
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
          <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Recent Upcoming Events
                </h2>

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