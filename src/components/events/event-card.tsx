
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


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
 interface EventProp{
    event:IEvent,
    onDelete?:(id:string)=>void,
    currentUserId: string;
 }


const EventCard = ({event,currentUserId}:EventProp) => {
   
    

   const isOwner =event.createdById===currentUserId
    console.log("Event Creator ID:", event.createdById);
console.log("Current User ID:", currentUserId);
console.log("Is Owner:", isOwner);
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
        <Image
          src={event.thumbnailImageUrl}
          alt={event.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

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
          <Button
         
            variant="outline"
            size="sm"
            className="flex-1 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-700"
          >
            <Link href={`/manage-events/${event._id}/edit`} className="flex items-center gap-1.5">
              <Pencil size={15} />
              Edit
            </Link>
          </Button>

          {/* Delete */}
          <AlertDialog>
            <AlertDialogTrigger >
                <Button
                variant="outline"
                size="sm"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                <Trash2 size={15} />
                Delete
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete this event?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete `{event.title}`?
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                //   onClick={() => onDelete(event._id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete Event
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>


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