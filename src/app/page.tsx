'use client';
import { Hero } from "@/components/home/hero";
import Features from "@/components/home/features";
import UpcomingEvents from "@/components/home/Upcoming-Events";
import Gallery from "@/components/home/gallery";
import Newsletter from "@/components/home/newsletter";

export default function Home() {
  return (
    <div className="bg-green-50 dark:bg-background">
      <Hero />
      <Features />
      <UpcomingEvents/>
      <Gallery />
      <Newsletter />

    </div>
      
      
  );
}
