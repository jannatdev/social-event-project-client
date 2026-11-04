import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import JoinedEventClient from "../JoinedEventClient/page";
import { Suspense } from "react";



export default function JoinedEventsPage() {
  return (
    <Suspense fallback={<p className="text-center py-10">Loading joined events...</p>}>
      <JoinedEventsData />
    </Suspense>
  );
}




 async function JoinedEventsData() {
  

  const requestHeaders = await headers();

const jwtToken = await auth.api.getToken({
  headers: requestHeaders,
});


  const token = jwtToken?.token;
  
  if (!token) {
    throw new Error("Failed to generate JWT token");
  }

  
   const session = await auth.api.getSession({
    headers:requestHeaders,
   });

const email = session?.user?.email;

if (!email) {
  throw new Error("User is not logged in");
}



 
  const res = await fetch(
    `https://social-event-project-server.vercel.app/events/joiningEvents/${encodeURIComponent(email)}`, {
      method:"GET",
      headers: {
       Authorization: `Bearer ${token}`,
      },

      console.log("Status:", res.status);
       console.log("Response:", await res.clone().text());

      cache: "no-store",
    }
  );

  if (!res.ok) {

    
  
    throw new Error("Failed to fetch events");
  }
       console.log("Status:", res.status);
       console.log("Response:", await res.clone().text());

     
  const events = await res.json();

  console.log("Protected API data:",events);
  return (
    <JoinedEventClient iniitialEvents={Array.isArray(events) ? events : []} />
  );
}

    


