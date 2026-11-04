"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  HandHeart,
  MapPin,
  Shirt,
  ShieldCheck,
  Snowflake,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Sparkles,
    title: "Discover Drives",
    description:
      "Find upcoming winter cloth drives across Mirpur by date, zone and organiser — all in one feed.",
  },
  {
    icon: CalendarCheck,
    title: "Join in Seconds",
    description:
      "RSVP to a drive and get collection points, reminders and directions straight to your dashboard.",
  },
  {
    icon: Shirt,
    title: "Donate Warm Items",
    description:
      "Sweaters, blankets, shawls and jackets — drop them at the nearest collection point.",
  },
  {
    icon: HandHeart,
    title: "Volunteer With Us",
    description:
      "Sign up to sort, pack and hand out supplies on distribution day. No experience needed.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Reach",
    description:
      "Every item is logged and handed directly to verified families in your zone — nothing lost in between.",
    featured: true,
  },
  {
    icon: TrendingUp,
    title: "Track Your Impact",
    description:
      "Watch live counters grow: families warmed, items distributed and drives completed this season.",
  },
] as const;

const Features = () => {
  // The card that is currently highlighted green — clicking any card makes it active
  const [activeIndex, setActiveIndex] = useState(() =>
    features.findIndex((feature) => "featured" in feature && feature.featured)
  );

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white py-16 dark:bg-card sm:py-20"
    >
      {/* Soft green blooms + snowflake watermark for brand consistency */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-primary/5 blur-3xl"
      />
      <Snowflake
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-8 size-40 text-primary/5 sm:size-56"
      />

      <div className="container relative mx-auto px-4">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Editorial column */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <Snowflake className="size-4" aria-hidden />
              Why SheetSathi
            </span>

            <h2 className="mt-5 font-heading text-3xl leading-tight font-extrabold tracking-tight text-foreground sm:text-4xl">
              Everything You Need to{" "}
              <span className="text-primary">Give Warmth</span>
            </h2>

            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              From finding a drive near you to tracking where every sweater ends
              up — SheetSathi keeps donors, volunteers and organisers on the
              same page all winter long.
            </p>

            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/upcoming-events" />}
              className="mt-8 h-12 rounded-xl px-7 text-base font-semibold shadow-lg shadow-primary/30"
            >
              Explore Drives
              <ArrowRight aria-hidden />
            </Button>

            <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" aria-hidden />
              Serving 18 zones across Bangladesh
            </p>
          </div>

          {/* Feature tiles — click to highlight one in brand green */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {features.map((feature, index) => {
              const active = index === activeIndex;

              return (
                <Card
                  key={feature.title}
                  role="button"
                  tabIndex={0}
                  aria-pressed={active}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                  className={`cursor-pointer outline-none transition-all duration-300 hover:-translate-y-1 ${
                    active
                      ? "ring-0 bg-primary text-primary-foreground shadow-xl shadow-primary/25"
                      : "hover:shadow-lg hover:shadow-primary/10 focus-visible:ring-2 focus-visible:ring-primary/50"
                  }`}
                >
                  <CardHeader className="gap-3">
                    <span
                      className={`flex size-11 items-center justify-center rounded-full ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <feature.icon className="size-5" aria-hidden />
                    </span>
                    <CardTitle
                      className={`text-lg font-bold ${
                        active ? "text-white" : "text-foreground"
                      }`}
                    >
                      {feature.title}
                    </CardTitle>
                    <CardDescription
                      className={`leading-relaxed ${
                        active ? "text-white/85" : ""
                      }`}
                    >
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
