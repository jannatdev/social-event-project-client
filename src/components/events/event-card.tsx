
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Pencil,
  Trash2,
  Eye,
  Clock,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { EditButton } from "../button/update-button";



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
//  interface EventProp{
//     event:IEvent,
//     onDelete?:(id:string)=>void,
//     currentUserId: string;
//  }


const EventCard = ({event}:{event:IEvent}) => {

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
          <Card className="group overflow-hidden border border-gray-200 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-0 gap-0">

      {/* Event Thumbnail */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100">

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
        <h2 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors">
          {event.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-3 mt-5">

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center justify-center size-9 rounded-lg bg-green-50 text-green-600 shrink-0">
              <MapPin size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-400">Location</p>
              <p className="font-medium text-gray-700 truncate">
                {event.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center justify-center size-9 rounded-lg bg-green-50 text-green-600 shrink-0">
              <CalendarDays size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Event Date</p>
              <p className="font-medium text-gray-700">
                {formattedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center justify-center size-9 rounded-lg bg-green-50 text-green-600 shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Event Time</p>
              <p className="font-medium text-gray-700">
                {formattedTime}
              </p>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-5" />

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
             { isOwner && ( <>

          {/* Edit */}
        
           <EditButton event={event}/>
          {/* Delete */}
         
                <Button
                variant="outline"
                size="sm"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                <Trash2 size={15} />
                Delete
                </Button>
        

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