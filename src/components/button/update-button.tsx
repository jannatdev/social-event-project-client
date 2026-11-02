'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, ImageIcon, MapPin, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client"
import {
  
  EVENT_TYPES,
 
  isHttpUrl,
  toDateTimeLocalValue,
  validateEventForm,
  type EventFormErrors,
  type EventFormValues,
} from "@/lib/events";



 interface UpdateButtonProps {
  event: {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    thumbnailImageUrl: string;
    location: string;
    eventDate: string | Date;
    createdByEmail: string;
  };
}

export function EditButton({event}:UpdateButtonProps) {
    const router = useRouter();
    const { data: session, isPending:isSessionPending } = authClient.useSession();
    const [isPending, setIsPending] = useState(false);
      
    const user = session?.user;

     if (isPending) {
  return <p>Loading...</p>;
}

if (!session?.user) {
  return <p>Please login</p>;
}
    const [values, setValues] = useState<EventFormValues>({
      
      title: event.title,
    description: event.description,
    eventType: event.eventType as EventFormValues["eventType"],
    thumbnailImageUrl: event.thumbnailImageUrl,
    location: event.location,
    eventDate: toDateTimeLocalValue(new Date(event.eventDate)),
  });
   function updateField(field: keyof EventFormValues, value: string) {
       setValues((prev) => ({ ...prev, [field]: value }));}
     
    //  const dateInputRef = useRef<HTMLInputElement>(null);
     
    //    React.useEffect(() =>
    //            const input = dateInputRef.current;
    //      if (input) {
    //    input.min = toDateTimeLocalValue(new Date());
    //      }
    //    }, []); 
    {new Date(event.eventDate).toLocaleDateString("en-GB", {
  timeZone: "Asia/Dhaka",
})}
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
     event.preventDefault();
    
 
    
  
        try{
         setIsPending(true);
         const updateData = {
          ...values,
          eventDate: new Date(values.eventDate),
        };
 
        const res =await fetch(`http://localhost:8000/events/${event._id}`,{
         method:"PATCH",
         headers:{
             'content-type':'application/json'
         },
         body:JSON.stringify(updateData)
     })
     const data = await res.json()
 
     if(!res.ok){
         throw new Error(data.message || "Failed to update event")
     }
     toast.success("Event updated successfully!");
     router.push("/manage-events");
     router.refresh();
       
 
 }catch (error){
     console.error(error)
 
  
     
 
 }finally{
     setIsPending(true);
 
 }
 }   
 



  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
        <DialogTrigger render={
           <Button
         
            variant="outline"
            size="sm"
            className="flex-1 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-700"
          >
            <Pencil size={15} />
              Edit
            {/* <Link href={`/UpdateButton`} className="flex items-center gap-1.5">
              
            </Link> */}
          </Button>}/>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your Event here.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            {/* Name */}
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input   className="h-full"
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. Mirpur 10 Winter Cloth Distribution"
                  value={values.title} />
            </Field>
            {/* Type */}
            <Field id="eventType">
               <Label htmlFor="EVENT_TYPES">Event type</Label>
             
             <Select
                // items={EVENT_TYPES}
                value={values.eventType || null}
                onValueChange={(value) =>
                  updateField("eventType", (value as string) ?? "")
                }
              >
                <SelectTrigger
                  id="eventType"
                  className="h-10 w-full"
                
                >
                  <SelectValue placeholder="Choose an event type" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              
            </Field>
            {/* Location */}
              <Field id="location" >
                <Label htmlFor="Location">Location</Label>
             
              <InputGroup className="h-10">
                <InputGroupAddon>
                  <MapPin aria-hidden />
                </InputGroupAddon>
                <InputGroupInput
                  className="h-full"
                  id="location"
                  name="location"
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. Mirpur 10, Dhaka"
                  value={values.location}
                 
                  onChange={(event) => updateField("location", event.target.value)}
                />
              </InputGroup>
            </Field>
            {/* Date */}
             <Field id="eventDate" >
        
              <Label htmlFor="Location">Event date & time</Label>
              <InputGroup className="h-10">
                <InputGroupAddon>
                  <Calendar aria-hidden />
                </InputGroupAddon>
                <InputGroupInput
                 
                  className="h-full"
                  id="eventDate"
                  name="eventDate"
                  type="datetime-local"
                  value={values.eventDate}
                 
                  onChange={(event) =>
                    updateField("eventDate", event.target.value)
                  }
                />
              </InputGroup>
            </Field>
            {/* image */}
            <Field id="thumbnailImageUrl">
              <Label>Thumbnail image URL</Label>
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                            <InputGroup className="h-10 sm:flex-1">
                              <InputGroupAddon>
                                <ImageIcon aria-hidden />
                              </InputGroupAddon>
                              <InputGroupInput
                                className="h-full"
                                id="thumbnailImageUrl"
                                name="thumbnailImageUrl"
                                type="url"
                                autoComplete="url"
                                placeholder="https://..."
                                value={values.thumbnailImageUrl}
                               
                                onChange={(event) =>
                                  updateField("thumbnailImageUrl", event.target.value)
                                }
                              />
                            </InputGroup>
            
                            
                          </div>
                        </Field>           
                       
                        
                          



          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Update</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
