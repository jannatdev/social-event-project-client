import type { Metadata } from "next";
import Link from "next/link";
import {
  BedDouble,
  Clock3,
  HandCoins,
  HandHeart,
  Mail,
  MapPin,
  Phone,
  Shirt,
  Soup,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DonateForm } from "@/components/donate/donate-form";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Want to donate winter clothes, blankets, food or funds to SheetSathi? Contact our Mirpur team and we will arrange a pickup.",
};

const donationIdeas = [
  {
    icon: Shirt,
    title: "Winter Clothes",
    text: "Sweaters, jackets, shawls and warm clothes — in any condition, we clean and repair before handing them over.",
  },
  {
    icon: BedDouble,
    title: "Blankets",
    text: "Blankets, bed sheets and handi (rugs) for families sleeping out in the cold.",
  },
  {
    icon: Soup,
    title: "Food & Meals",
    text: "Packaged food, hot meals and seasonal boxes handed out at our distribution drives.",
  },
  {
    icon: HandCoins,
    title: "Funds",
    text: "Every taka goes to transport, tailoring and supplies for the next drive.",
  },
];

const contactItems = [
  {
    icon: MapPin,
    lines: ["Mirpur-10, Dhaka 1216", "Dhaka, Bangladesh"],
  },
  {
    icon: Phone,
    lines: ["+880 1822990759"],
    href: "tel:+8801822990759",
  },
  {
    icon: Mail,
    lines: ["info@sheetsathi.org"],
    href: "mailto:info@sheetsathi.org",
  },
  {
    icon: Clock3,
    lines: ["Drives every Saturday", "4:00 PM – 8:00 PM (winter)"],
  },
];

export default function DonatePage() {
  return (
    <div className="bg-green-50 dark:bg-background">
      {/* Page header */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-14 pb-10 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          <HandHeart className="size-4" aria-hidden />
          Donate
        </span>
        <h1 className="mt-5 font-heading text-4xl font-extrabold tracking-tight text-green-600 sm:text-5xl">
          Your Donation Warms a Family
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
          Sweaters, blankets, food or funds — tell us what you would like to
          give and our team in Mirpur will contact you to arrange a pickup or
          handover.
        </p>
      </section>

      {/* Two-column body: info on the left, contact form on the right */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-3">
            <div>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight">
                What you can give
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {donationIdeas.map((idea) => (
                  <div
                    key={idea.title}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-card"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400">
                      <idea.icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-heading font-bold">
                      {idea.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {idea.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct contact details */}
            <div className="rounded-2xl border border-green-600/15 bg-green-100/50 p-5 dark:bg-muted/20">
              <h2 className="inline-flex items-center gap-2 font-heading text-lg font-extrabold tracking-tight">
                <Phone className="size-4 text-green-600" aria-hidden />
                Prefer to talk directly?
              </h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {contactItems.map((item) => {
                  const body = (
                    <span className="group inline-flex gap-3">
                      <item.icon
                        className="mt-0.5 size-4 shrink-0 text-green-600"
                        aria-hidden
                      />
                      <span className="flex flex-col text-sm text-gray-600 group-hover:text-green-700 dark:text-gray-300 dark:group-hover:text-green-400">
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

              <div className="mt-5 flex flex-wrap gap-3">
                <Button
                  size="sm"
                  nativeButton={false}
                  render={<Link href="tel:+8801700000000" />}
                  className="gap-2 font-semibold"
                >
                  <Phone className="size-4" aria-hidden />
                  Call now
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  nativeButton={false}
                  render={<Link href="mailto:salam@sheetsathi.org" />}
                  className="gap-2 font-semibold"
                >
                  <Mail className="size-4" aria-hidden />
                  Email us
                </Button>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <DonateForm />
          </div>
        </div>
      </section>
    </div>
  );
}
