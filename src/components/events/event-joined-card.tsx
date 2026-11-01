


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

import {
  CalendarDays,
  MapPin,
  Users,
  UserRound,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IEvent } from "./event-card";
import Image from "next/image";
import { toast } from "sonner";


const EventJointCard = ({event}:{event:IEvent}) => {
     const router = useRouter()
     const {data:session,isPending} =useSession()

     const [joining,setJoining] = useState(false)
     const [joined,setJoined] = useState(false)

     const handleJoinEvent =async()=>{

      toast.success("Joined is Successful")
      if(isPending) return;
      if(!session?.user){
        router.push('/login')
      }
    

     try{
       setJoining (true);

       const res= await fetch(`http://localhost:8000/events/${event._id}/join`,{
        method:"POST",
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({
          userId:session?.user?.id,
          userName:session?.user?.name,
          userEmail:session?.user?.email,
        })
       
       })
       const data = await res.json()

       
       
       if(!res.ok){
        throw new Error(data.message)
       }
       setJoined(true);
     }catch(error){
      console.error(error);
      toast.error("Something went wrong")
     }finally{
      setJoining(false)
     }

     }


  return (
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border border-gray-200 p-4">

      {/* Event Information */}
      <div className="lg:col-span-2 space-y-6">

        {/* Banner */}
        <div className="relative h-100 overflow-hidden rounded-2xl">
          <Image
            src={event.thumbnailImageUrl}
            alt={event.title}
            fill
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

          <Badge className="absolute top-5 left-5 bg-green-600 text-white">
            {event.eventType}
          </Badge>

          <h1 className="absolute bottom-6 left-6 text-3xl md:text-4xl font-bold text-white">
            {event.title}
          </h1>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>About This Event</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-gray-600 leading-8">
              {event.description}
            </p>
          </CardContent>
        </Card>

        {/* Event Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <Card>
            <CardContent className="flex gap-3 items-center p-5">
              <CalendarDays className="text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Event Date</p>
                <p className="font-semibold">
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex gap-3 items-center p-5">
              <MapPin className="text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold">{event.location}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex gap-3 items-center p-5">
              <Users className="text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Event Type</p>
                <p className="font-semibold">{event.eventType}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex gap-3 items-center p-5">
              <UserRound className="text-green-600" />
              <div className="min-w-0">
                <p className="text-sm text-gray-500">Organizer</p>
                <p className="font-semibold truncate">{event.email}</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Join Event Card */}
      <div>
        <Card className="sticky top-8 overflow-hidden shadow-md">

          <div className="h-2 bg-green-600" />

          <CardHeader>
            <Badge className="w-fit bg-green-100 text-green-700">
              Event Registration
            </Badge>

            <CardTitle className="text-2xl">
              Join This Event
            </CardTitle>

            <CardDescription>
              Be part of this amazing experience!
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">

            <div className="flex items-center gap-3 text-sm">
              <CalendarDays className="text-green-600" />
              {new Date(event.eventDate).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-3 text-sm">
              <MapPin className="text-green-600" />
              {event.location}
            </div>

            <Separator />

            {joined ? (
              <div className="rounded-xl bg-green-50 p-5 text-center">
                <CheckCircle2 className="mx-auto mb-2 text-green-600" size={35} />
                <p className="font-bold text-green-700">
                  Successfully Joined!
                </p>
              </div>
            ) : (
              <Button
                onClick={handleJoinEvent}
                disabled={joining || isPending}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold"
              >
                {joining ? "Joining..." : "Join Event"}
              </Button>
            )}

            <p className="text-xs text-center text-gray-400">
              Login is required to join this event.
            </p>

          </CardContent>
        </Card>
      </div>

    </div>
    
  );
};

export default EventJointCard;