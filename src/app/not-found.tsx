
import Link from "next/link";
import {
  
  CalendarDays,
  Compass,
  Home,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-background px-4 py-16">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-3xl text-center">

        {/* Illustration */}
        <div className="relative mx-auto mb-8 flex h-52 w-52 items-center justify-center sm:h-64 sm:w-64">

          <div className="absolute inset-0 rounded-full border border-dashed border-primary/20" />

          <div className="absolute inset-5 rounded-full bg-primary/5" />

          <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl border border-primary/10 bg-background shadow-xl sm:h-40 sm:w-40">
            <Compass
              className="h-20 w-20 text-primary sm:h-24 sm:w-24"
              strokeWidth={1.2}
            />

            <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <Leaf className="h-6 w-6" />
            </div>
          </div>

          <span className="absolute left-2 top-12 h-3 w-3 rounded-full bg-primary/40" />
          <span className="absolute bottom-8 right-4 h-4 w-4 rounded-full bg-primary/30" />
        </div>

        {/* 404 Text */}
        <div className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
            Oops! Page not found
          </p>

          <h1 className="text-7xl font-extrabold tracking-tight text-foreground sm:text-8xl md:text-9xl">
            404<span className="text-primary">.</span>
          </h1>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Looks like you took a wrong turn!
          </h2>

          <p className="mx-auto max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
            The page you are looking for might have been moved,
            removed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Button  size="lg" className="w-full gap-2 sm:w-auto">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Button
            
            size="lg"
            variant="outline"
            className="w-full gap-2 sm:w-auto"
          >
            <Link href="/Upcoming-events">
              <CalendarDays className="h-4 w-4" />
              Explore Events
            </Link>
          </Button>

        </div>

        {/* Footer */}
        <div className="mt-14 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Leaf className="h-4 w-4 text-primary" />
          <span>
            Together, we can make a difference.
          </span>
        </div>

      </div>
    </main>
  );
}
