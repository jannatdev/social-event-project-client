import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  HandHeart,
  MapPin,
  Shirt,
  Snowflake,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const stats = [
  { icon: Users, value: "2,500+", label: "Families Warmed" },
  { icon: Shirt, value: "12,000+", label: "Items Distributed" },
  { icon: HandHeart, value: "40+", label: "Drives Held" },
  { icon: MapPin, value: "18", label: "Mirpur Zones" },
] as const;

export function Hero() {
  return (
    <section className="hero-bg relative isolate overflow-hidden">
      {/* Soft top/bottom fades so the banner melts into the page */}

      <div className="absolute inset-0 -z-10 animate-float-soft bg-cover bg-center bg-no-repeat shadow-primary/50" style={{
        backgroundImage:"url('./images/hero.png')"
      }}>
       

      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/25 to-transparent"
      />

    
      

      {/* Floating counter badge — bottom right */}
      <div className="absolute right-4 bottom-24 z-10 hidden sm:right-8 lg:block">
        <div
          className="animate-float-soft flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm"
          style={{ animationDelay: "1.4s" }}
        >
          <BadgeCheck className="size-4 text-primary-foreground" aria-hidden />
          12,000+ Warm Items Delivered
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[88vh] w-full max-w-5xl flex-col items-center justify-center px-4 py-28 text-center sm:px-6">
        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-primary/25 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
          <Snowflake className="size-4" aria-hidden />
          Social Development Events
        </div>

        {/* Headline */}
        <h1 className="mt-6 font-heading text-5xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Small Actions,
          <br />
          <span className="text-primary-foreground">Greater Impact</span>
        </h1>

        {/* Sub copy */}
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white sm:text-lg">
          SheetSathi brings people and communities together across Bangladesh to create positive change through various social initiatives
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/upcoming-events" />}
            className="h-12 rounded-xl px-7 text-base font-semibold shadow-lg shadow-primary/40"
          >
            Explore Events
            <ArrowRight aria-hidden />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/donate" />}
            className="h-12 rounded-xl border-white/30 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/20 hover:text-white"
          >
            <HandHeart aria-hidden />
           Donate
          </Button>
        </div>

        {/* Stats */}
        <dl className="mt-14 grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <stat.icon
                className="mb-1 size-5 text-primary-foreground/80"
                aria-hidden
              />
              <dd className="font-heading text-3xl font-extrabold text-white">
                {stat.value}
              </dd>
              <dt className="text-sm text-white/60">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Bottom fade into the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent"
      />
    </section>
  );
}
