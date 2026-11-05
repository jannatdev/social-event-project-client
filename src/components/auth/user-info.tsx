"use client";

import { authClient } from '@/lib/auth-client'

import Link from "next/link";
import { useRouter } from "next/navigation";

import { signOut } from "@/lib/auth-client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  CalendarPlus,
  CalendarCheck,
  Users,
  LogOut,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { toast } from 'sonner';





const UserInfo = () => {

    const router = useRouter()

    const { data: session, isPending, refetch} = authClient.useSession()

    const user = session?.user

     if (isPending) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Loader2 className="animate-spin" size={18} />
      </Button>
    );
  }

    const getInitials = (name: string) =>{
        if(!name) return "u";


    return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 5)
    .map((part) => part[0].toUpperCase())
    .join("");

    }

 

    const handleLogOut = async () => {

     
      await authClient.signOut()

      toast.success( "Signed out is successful", );
     await refetch();
    router.push("/");
    router.refresh();
      };

    return (
        <div>

            {
                user ?(
        <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              className="group flex items-center gap-2 rounded-full border border-green-600 bg-background py-1 pr-2.5 pl-1 transition-colors hover:bg-muted"
              aria-label="Open account menu"
            />
          }
        >
          <Avatar className="size-8">
            <AvatarImage
              src={user.image ?? undefined}
              alt={user.name || "User"}
            />
            
            <AvatarFallback className="bg-green-600 font-semibold text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <span className="max-w-36 truncate text-sm text-green-600 font-medium">
            {user.name}
          </span>
          <ChevronDown
            className="size-4 text-muted-foreground transition-transform duration-200 group-data-popup-open:rotate-180"
            aria-hidden
          />
        </DropdownMenuTrigger>

         <DropdownMenuContent
           align="end"
           sideOffset={8}
           className="w-60 rounded-xl p-2 shadow-lg"
         >

                <DropdownMenuLabel className="px-2 py-1.5">
                <span className="block text-xs text-muted-foreground">
                    Signed in as
                </span>
                <span className="block truncate text-sm font-semibold text-foreground">
                    {user.email}
                </span>
                </DropdownMenuLabel>

           <DropdownMenuSeparator className="my-1.5" />

        <DropdownMenuItem
        className="gap-3 rounded-lg px-2.5 py-2 text-sm font-medium"
        onClick={() => router.push("/create-event")}
        >
        <CalendarPlus />
        <Link href="/create-event">Create Event</Link>
        
        </DropdownMenuItem>

        <DropdownMenuItem
        className="gap-3 rounded-lg px-2.5 py-2 text-sm font-medium"
        onClick={() => router.push("/manage-events")}
        >
        <CalendarCheck />
        Manage Events
        </DropdownMenuItem>

        <DropdownMenuItem
        className="gap-3 rounded-lg px-2.5 py-2 text-sm font-medium"
        onClick={() => router.push("/joined-events")}
        >
        <Users />
        Joined Events
        </DropdownMenuItem>

    <DropdownMenuSeparator className="my-1.5" />

        <DropdownMenuItem
        variant="destructive"
        className="gap-3 rounded-lg px-2.5 py-2 text-sm font-medium"
        onClick={handleLogOut}
        >
        <LogOut />
        Sign Out
        </DropdownMenuItem>

      </DropdownMenuContent>
  </DropdownMenu>

                ):(        
              
                   <div className="hidden items-center gap-2 md:flex">
        
          <Button
            nativeButton={false}
            render={<Link href="/login" />}
            className="px-5 font-semibold shadow-sm shadow-primary/30"
          >
            Login
          </Button>
                  </div>
                 
                 
                )
            }
            
        </div>
    );
};

export default UserInfo;
