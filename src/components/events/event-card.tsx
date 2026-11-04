
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  
  Eye,
  Clock,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { EditButton } from "../button/update-button";
import DeleteButton from "../button/delete-button";



export interface IEvent {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnailImageUrl: string;
  location: string;
  eventDate: string;
  createdByEmail: string;
  createdById: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
   email: string;
}
interface EventCardProps {
    event: IEvent;
    onDelete: (id: string) => void;
    onUpdate: (updatedEvent: IEvent) => void;
     showActions?: boolean;
}



const EventCard = ({event,onDelete,onUpdate, showActions = false}:EventCardProps) => {

    const {data:session}=useSession()
   
    const currentUserId = session?.user?.id

   const isOwner =event.createdById===currentUserId
   

    const formattedDate = new Date(event.eventDate).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
)
    const formattedTime= new Date(event.eventDate).toLocaleTimeString(
        "en-US",
    
    {
        
   
      hour: "2-digit",
      minute:"2-digit",
      hour12: true,
    

    }
    )
  
    return (
          <Card className="group overflow-hidden border border-gray-200 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-0 gap-0 dark:border-neutral-800 dark:bg-card">

      {/* Event Thumbnail */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-neutral-800">

        {
            event.thumbnailImageUrl ?(
        <Image
          src={event.thumbnailImageUrl}
          alt={event.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

            ):(
                <div className="flex h-full w-full items-center justify-center text-gray-400">
      No Image Available
    </div>
            )
        }
       

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

        {/* Event Type */}
        <Badge className="absolute top-4 left-4 bg-green-600 hover:bg-green-700 text-white border-0 px-3 py-2.5 rounded-full text-xs font-medium">
          {event.eventType}
        </Badge>
      </div>

      {/* Event Information */}
      <CardContent className="p-5">

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors dark:text-gray-100">
          {event.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed dark:text-gray-400">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-3 mt-5 grid gap-2">

          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center justify-center size-9 rounded-lg bg-green-100 text-green-600 shrink-0 dark:bg-green-950 dark:text-green-400">
              <MapPin size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-[12px] text-gray-400">Location</p>
              <p className="text-[14px] font-medium text-gray-700 dark:text-gray-200 truncate">
                {event.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center justify-center size-9 rounded-lg bg-green-100 text-green-600 shrink-0 dark:bg-green-950 dark:text-green-400">
              <CalendarDays size={16} />
            </div>
            <div>
              <p className="text-[12px] text-gray-400">Event Date</p>
              <p className="text-[14px] font-medium text-gray-700 dark:text-gray-200">
                {formattedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center justify-center size-9 rounded-lg bg-green-100 text-green-600 shrink-0 dark:bg-green-950 dark:text-green-400">
              <Clock size={16} />
            </div>
            <div>
              <p className="text-[12px] text-gray-400">Event Time</p>
              <p className=" text-[14px] font-medium text-gray-700 dark:text-gray-200">
                {formattedTime}
              </p>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-5 dark:border-white/10" />

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
             {showActions && isOwner && ( <>

          {/* Edit */}
        
           <EditButton event={event} onUpdate={onUpdate}/>
          {/* Delete */}
          <DeleteButton event={event} onDelete={onDelete}  />
         
          </>

            )}
             

          {/* View Event */}
          <Button
            
            size="sm"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <Link href={`/events/${event._id}`} className="flex items-center gap-1.5 py-6">
              <Eye size={15} />
              View Event
            </Link>
          </Button>

        </div>
      </CardContent>
          </Card>
    );
};

export default EventCard;