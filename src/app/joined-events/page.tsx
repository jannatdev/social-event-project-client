import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import JoinedEventClient from "../JoinedEventClient/page";





export default async function JoinedEventsPage() {

  // Get user session
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session?.user) {
    redirect("/login");
  }

  const email = session.user.email;

  // Generate JWT token
   const jwtToken = await auth.api.getToken({
    headers: requestHeaders,
  });

  const token = jwtToken?.token;

  if (!token) {
    throw new Error("Failed to generate JWT token");
  }

    


 
  const res = await fetch(
    `http://localhost:8000/events/joiningEvents/${email}`, {
      method:"GET",
      headers: {
       Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const events = await res.json();


  return (
    <JoinedEventClient iniitialEvents={events} />
  );
}

    


