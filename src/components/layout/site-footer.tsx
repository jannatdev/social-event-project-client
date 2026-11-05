import type * as React from "react";
import Link from "next/link";
import {
  Clock3,
  HandHeart,
  Mail,
  MapPin,
  Phone,
  Snowflake,
} from "lucide-react";

import { cn } from "cn";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/upcoming-events", label: "Upcoming Events" },
  { href: "/donate", label: "Donate" },
  { href: "/login", label: "Login" },
] as const;

const involveLinks = [
  { href: "/upcoming-events", label: "Become a Volunteer" },
  { href: "/donate", label: "Donate Winter Clothes" },
  { href: "/upcoming-events", label: "Join a Distribution Drive" },
  { href: "/login", label: "Track Your Impact" },
] as const;

const contactItems = [
  {
    icon: MapPin,
    lines: ["Mirpur-10, Dhaka 1216", "Dhaka, Bangladesh"],
  },
  {
    icon: Mail,
    lines: ["salam@sheetsathi.org"],
    href: "mailto:salam@sheetsathi.org",
  },
  {
    icon: Phone,
    lines: ["+880 1700-000000"],
    href: "tel:+8801700000000",
  },
  {
    icon: Clock3,
    lines: ["Drives every Saturday", "4:00 PM – 8:00 PM (winter)"],
  },
] as const;

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    label: "X",
    href: "https://x.com",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
] as const;

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading text-sm font-extrabold tracking-wide text-white uppercase">
      {children}
    </h3>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Faint green glow at the top edge for brand consistency */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
                <Snowflake className="size-5" aria-hidden />
              </span>
              <span className="font-heading text-xl font-extrabold tracking-tight">
                <span className="text-white">Care</span>
                <span className="text-primary">Hub</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              A community-led winter welfare initiative bringing warm clothes to
              the families, rickshaw pullers and day labourers of Mirpur, Dhaka.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70",
                    "transition-colors hover:border-primary/40 hover:bg-primary/15 hover:text-primary"
                  )}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                    className="size-4"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get involved */}
          <nav aria-label="Get involved">
            <ColumnHeading>Get Involved</ColumnHeading>
            <ul className="mt-5 space-y-3">
              {involveLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="mt-5 space-y-4">
              {contactItems.map((item) => {
                const body = (
                  <span className="group inline-flex gap-3">
                    <item.icon
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span className="flex flex-col text-sm text-white/60 group-hover:text-primary">
                      {item.lines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </span>
                  </span>
                );
                return (
                  <li key={item.lines[0]}>
                    {"href" in item && item.href ? (
                      <a href={item.href}>{body}</a>
                    ) : (
                      body
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* CTA strip */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 sm:flex-row">
          <p className="text-center text-sm text-white/70 sm:text-left">
            Have sweaters, blankets or jackets to spare? We&apos;ll pick them up
            from your door in Mirpur.
          </p>
          <Link
            href="/donate"
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <HandHeart aria-hidden />
            Donate now
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© 2026 CareHub. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            <Snowflake className="size-3.5 text-primary" aria-hidden />
            Keeping warm, one family at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}
