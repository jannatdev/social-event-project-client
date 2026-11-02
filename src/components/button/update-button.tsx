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


import { toast } from "sonner";
import { authClient } from "@/lib/auth-client"
import {
  
  EVENT_TYPES,
 
  toDateTimeLocalValue,
  
  type EventFormValues,
} from "@/lib/events";
import { useState } from "react"
import { Textarea } from "../ui/textarea"



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

    const [isUpdating,setIsUpdating] = useState(false)

    const [values, setValues] = useState<EventFormValues>({
      
      title: event.title,
    description: event.description,
    eventType: event.eventType as EventFormValues["eventType"],
    thumbnailImageUrl: event.thumbnailImageUrl,
    location: event.location,
    eventDate: toDateTimeLocalValue(new Date(event.eventDate)),
  });
    const { data: session, isPending:isSessionPending } = authClient.useSession();
    
      
    const user = session?.user;

    


if (!session?.user) {
  return <p>Please login</p>;

}
   

   function updateField(field: keyof EventFormValues, value: string) {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  }
  //  function updateField(field: keyof EventFormValues, value: string) {
  //      setValues((prev) => ({ ...prev, [field]: value }));}
     
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
  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
     formEvent.preventDefault();
     console.log("UPDATE FORM SUBMITTED!");
    
    try{

      
         const updateData = {
          ...values,
          eventDate: new Date(values.eventDate),
        };
        console.log("Update data:", updateData);

        
 
        const res =await fetch(`http://localhost:8000/events/${event._id}`,{
          
         method:"PATCH",
         headers:{
             'content-type':'application/json'
         },
         body:JSON.stringify(updateData)
     })
     const data = await res.json()
       console.log("Server response:", data);
 
     if(!res.ok){
         throw new Error(data.message || "Failed to update event")
     }
     toast.success("Event updated successfully!");
     router.push("/manage-events");
     router.refresh();
       
 
 }catch (error){
     console.error(error)
 
  
     
 
 }finally{
    setIsUpdating(false);
 }
 }   
 if (isSessionPending) {
    return <Button disabled size="sm">Loading...</Button>;
  }

    if (!user) {
    return null;
  }



  return (
     <Dialog>
    {/* Edit button */}
    <DialogTrigger
      render={
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
        >
          <Pencil size={15} />
          Edit
        </Button>
      }
    />

    {/* Dialog */}
    <DialogContent className="flex max-h-[85vh] flex-col overflow-hidden sm:max-w-lg">

      <DialogHeader>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogDescription>
          Update your event information.
        </DialogDescription>
      </DialogHeader>

      {/* IMPORTANT: Form is now INSIDE DialogContent */}
      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col"
      >
        {/* Scrollable fields */}
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto py-3">

          <FieldGroup>

            {/* Event title */}
            <Field>
              <Label htmlFor="title">Event name</Label>
              <Input
                id="title"
                value={values.title}
                onChange={(e) =>
                  updateField("title", e.target.value)
                }
              />
            </Field>

            {/* Event type */}
            <Field>
              <Label htmlFor="eventType">Event type</Label>

              <Select
                value={values.eventType || null}
                onValueChange={(value) =>
                  updateField("eventType", value ?? "")
                }
              >
                <SelectTrigger id="eventType" className="w-full">
                  <SelectValue placeholder="Choose event type" />
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
            <Field>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={values.location}
                onChange={(e) =>
                  updateField("location", e.target.value)
                }
              />
            </Field>

            {/* Date */}
            <Field>
              <Label htmlFor="eventDate">Event date & time</Label>
              <Input
                id="eventDate"
                type="datetime-local"
                value={values.eventDate}
                onChange={(e) =>
                  updateField("eventDate", e.target.value)
                }
              />
            </Field>

            {/* Image URL */}
            <Field>
              <Label htmlFor="thumbnailImageUrl">
                Thumbnail image URL
              </Label>
              <Input
                id="thumbnailImageUrl"
                type="url"
                value={values.thumbnailImageUrl}
                onChange={(e) =>
                  updateField("thumbnailImageUrl", e.target.value)
                }
              />
            </Field>

            {/* Description */}
            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={values.description}
                onChange={(e) =>
                  updateField("description", e.target.value)
                }
              />
            </Field>

          </FieldGroup>
        </div>

        {/* Footer stays inside the form */}
        <DialogFooter className="mt-4 shrink-0">
          <DialogClose
          render={<Button type="button">Cancel</Button>}
        />

        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Event"}
        </Button>
        </DialogFooter>

      </form>
    </DialogContent>
  </Dialog>
  )
}
