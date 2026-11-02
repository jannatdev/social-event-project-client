"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const galleryImages = [
  "/images/gallary/412152241_701964645448667_5884513189217290191_n.jpg",
  "/images/gallary/image.png",
  "/images/gallary/images (1).jpg",
  "/images/gallary/images (2).jpg",
  "/images/gallary/images (3).jpg",
  "/images/gallary/images (4).jpg",
  "/images/gallary/images (5).jpg",
  "/images/gallary/images (6).jpg",
  "/images/gallary/images (7).jpg",
  "/images/gallary/images (8).jpg",
  "/images/gallary/images.jpg",
  "/images/gallary/IMG20200112101159.jpg",
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-16 bg-white py-5 dark:bg-card">
      <div className="container mx-auto px-4">
        <h2 className="mb-2 text-center text-3xl font-bold">Gallery</h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-gray-600 dark:text-gray-300">
          Moments from our winter cloth distribution drives — warm clothes,
          warmer hearts.
        </p>

        <Carousel
          aria-label="Photo gallery from our winter cloth distribution drives"
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent>
            {galleryImages.map((src, index) => (
              <CarouselItem
                key={src}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="group relative aspect-square overflow-hidden rounded-xl  border-4 border-green-600  bg-white shadow-md">
                  <Image
                    src={src}
                    alt={`Gallery photo ${index + 1}`}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
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
