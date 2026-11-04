"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CalendarDays, Snowflake } from "lucide-react";

type GalleryImage = {
  src: string;
  eventName: string;
  eventType: string;
  eventDate: string;
};

const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallary/image.png",
    eventName: "Winter Cloth Distribution",
    eventType: "Cloth Distribution",
    eventDate: "2026-01-18",
  },
  {
    src: "/images/gallary/images (1).jpg",
    eventName: "Blood Donation Drive",
    eventType: "Donation Drive",
    eventDate: "2025-12-21",
  },
  {
    src: "/images/gallary/images (2).jpg",
    eventName: "Blanket Distribution",
    eventType: "Blanket Distribution",
    eventDate: "2026-01-05",
  },
  {
    src: "/images/gallary/images (3).jpg",
    eventName: "Blood Donation",
    eventType: "Blood Donation",
    eventDate: "2025-11-30",
  },
  {
    src: "/images/gallary/images (4).jpg",
    eventName: "Community Volunteering ",
    eventType: "Volunteer Program",
    eventDate: "2026-02-08",
  },
  {
    src: "/images/gallary/images (5).jpg",
    eventName: "Winter Cloth Distribution",
    eventType: "Winter Cloth Distribution",
    eventDate: "2025-10-12",
  },
  {
    src: "/images/gallary/images (6).jpg",
    eventName: " Relief Drive",
    eventType: "Relief Distribution",
    eventDate: "2026-03-15",
  },
  {
    src: "/images/gallary/images (7).jpg",
    eventName: "Cloth Donation",
    eventType: "Donation",
    eventDate: "2025-06-22",
  },
  {
    src: "/images/gallary/images (8).jpg",
    eventName: "Winter Cloth Distribution",
    eventType: "",
    eventDate: "2026-01-11",
  },
  {
    src: "/images/gallary/images.jpg",
    eventName: "Mirpur Winter Camp",
    eventType: "Community Event",
    eventDate: "2026-01-31",
  },
  {
    src: "/images/gallary/IMG20200112101159.jpg",
    eventName: "Donation Drive",
    eventType: "Winter Cloth Distribution",
    eventDate: "2020-01-12",
  },
];

const formatEventDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const Gallery = () => {
  return (
    <section id="gallery" className=" container mx-auto py-16  dark:bg-card">
      <div className=" space-y-4 px-4 mb-5 text-left">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <Snowflake className="size-4" aria-hidden />Gallery </span>
        <h2 className="mb-2  text-3xl text-left font-bold">All our activities</h2>
        </div>
        <div>
        <Carousel
          aria-label="Photo gallery from our winter cloth distribution drives"
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent>
            {galleryImages.map((item) => (
              <CarouselItem
                key={item.src}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="group relative aspect-square overflow-hidden rounded-xl  border-4 border-green-600  bg-white shadow-md">
                  <Image
                    src={item.src}
                    alt={`${item.eventName} — ${formatEventDate(item.eventDate)}`}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Readable gradient for the captions */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-black/45"
                  />

                  {/* Event Type */}
                  <span className="absolute top-3 left-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white shadow-md">
                    {item.eventType}
                  </span>

                  {/* Event Name + Event Date */}
                  <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                    <p className="line-clamp-2 text-sm font-semibold text-white drop-shadow-sm">
                      {item.eventName}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-white/85">
                      <CalendarDays size={12} aria-hidden />
                      {formatEventDate(item.eventDate)}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 size-9 border-white/70 bg-white/85 text-gray-700 shadow-lg backdrop-blur-sm hover:bg-white hover:text-gray-900" />
          <CarouselNext className="right-2 size-9 border-white/70 bg-white/85 text-gray-700 shadow-lg backdrop-blur-sm hover:bg-white hover:text-gray-900" />
        </Carousel>
      </div>
    </section>
  );
};

export default Gallery;
