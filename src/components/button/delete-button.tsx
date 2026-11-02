'use client'
import { Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

import { IEvent } from "../events/event-card";
import { toast } from "sonner";
import { useState } from "react";

const DeleteButton = ({event,onDelete}:
    {event:IEvent,
        onDelete:(id:string)=>void}) => {
    const router = useRouter();
    const {data:session,isPending,refetch}=useSession()
     const [open, setOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const user = session?.user
  
 if(!user){
    return <p>Please Log In</p>

 }
   const handleDeleteButton=async()=>{
     
     try{
        setDeleting(true)
        const res = await fetch (`http://localhost:8000/events/${event._id}`,{
            method:"DELETE",
            headers:{
                'Content-type':'application/json',
            }

        })  
        
        const data = await res.json()
         if(!res.ok){
         throw new Error(data.message || "Failed to delete event")
         
     }
    onDelete(event._id)
    setOpen(false)


     toast.warning("Event is Deleted !");
     router.push("/manage-events");
     router.refresh();
     refetch();
   }catch (error){
    console.error(error)
   }finally{
    setDeleting(false)
   }
}

  if (isPending) {
    return <Button disabled size="sm">Loading...</Button>;
  }

    if (!user) {
    return null;
  }


    return (
            <AlertDialog>
       

       
      <AlertDialogTrigger
        render={<Button type="submit" variant="destructive">Delete </Button>}
      />
      
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Event?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure? Do you want to delete this event?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction 
           variant="destructive"
           onClick={(e) => {
                            e.preventDefault()
                            handleDeleteButton()
                        }}
                        disabled={deleting}
                    >
                        {deleting ? "Deleting..." : "Delete"}
           </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    
    </AlertDialog>
    );
};

export default DeleteButton;