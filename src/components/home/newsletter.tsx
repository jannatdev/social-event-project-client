"use client";

import { Mail, Send, ShieldCheck, Snowflake } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <section id="newsletter" className="py-16 w-full  bg-green-900">
      <div className=" container mx-auto px-4">
        <div className="relative isolate overflow-hidden w-full -mb-15.5 px-6 py-14 shadow-xl shadow-green-600/25 sm:px-10 lg:px-16">
          {/* Falling snow — reuses the hero's snow layer for brand consistency */}
          <div
            aria-hidden
            className="hero-snow pointer-events-none absolute inset-0 opacity-30"
          />
          {/* Soft light blooms for depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-28 left-1/2 h-56 w-[42rem] -translate-x-1/2 rounded-full bg-white/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-20 size-72 rounded-full bg-black/10 blur-3xl"
          />
          {/* Faint snowflake watermark + floating accent */}
          <Snowflake
            aria-hidden
            className="absolute -right-8 -bottom-12 size-44 text-white/10 sm:size-56"
          />
          <Snowflake
            aria-hidden
            className="animate-float-soft absolute top-8 right-8 hidden size-7 text-white/40 sm:block"
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
            {/* Eyebrow pill — mirrors the hero badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
              <Mail className="size-4" aria-hidden />
              Stay in the loop
            </span>

            <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Never Miss a Winter Drive
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              Drive dates, collection points and impact stories from Mirpur —
              one short email a week during the season, and nothing else.
            </p>

            {/* Visual-only subscription form (no backend wired up) */}
            <form
              className="mt-8 w-full max-w-lg"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="flex flex-col gap-3 rounded-2xl bg-white/10 p-2 ring-1 ring-white/20 backdrop-blur-sm focus-within:bg-white/15 focus-within:ring-white/60 sm:flex-row sm:rounded-full">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="h-12 flex-1 border-0 bg-transparent px-5 text-white placeholder:text-white/60 focus-visible:border-transparent focus-visible:ring-0 md:text-sm"
                />
                <Button
                  type="submit"
                  className="h-12 shrink-0 gap-2 rounded-full bg-white px-7 text-sm font-semibold text-green-700 shadow-lg shadow-black/10 hover:bg-white/90 hover:text-green-800"
                >
                  Subscribe
                  <Send className="size-4" aria-hidden />
                </Button>
              </div>
            </form>

            <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-white/60">
              <ShieldCheck className="size-3.5" aria-hidden />
              One email a week, zero spam — unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
