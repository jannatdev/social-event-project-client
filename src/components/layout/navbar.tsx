"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {  Menu, Snowflake } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";
import UserInfo from "@/components/layout/user-info";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/upcoming-events", label: "Upcoming Events" },
  { href: "/create-event", label: "Create Events" },
] as const;

function NavLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative rounded-md px-1 py-2 text-sm font-medium transition-colors",
        isActive
          ? "text-primary"
          : "text-foreground/70 hover:text-primary",
        className
      )}
    >
      {label}
      {isActive && (
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-primary"
        />
      )}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = React.useState(pathname);

  // Close the mobile sheet whenever the route changes. Adjusting state during
  // render (instead of in an effect) avoids a cascading render pass.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
            <Snowflake className="size-5" aria-hidden />
          </span>
          <span className="font-heading text-xl font-extrabold tracking-tight">
            <span className="text-foreground">Sheet</span>
            <span className="text-primary">Sathi</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">

           <UserInfo></UserInfo>
          {/* <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/signup" />}
            className="px-5 font-semibold"
          >
            Sign Up
          </Button> */}
          {/* <Button
            nativeButton={false}
            render={<Link href="/login" />}
            className="px-5 font-semibold shadow-sm shadow-primary/30"
          >
            Login
          </Button> */}
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            nativeButton={false}
            render={<Link href="/login" />}
            className="font-semibold shadow-sm shadow-primary/30"
          >
            Login
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon-lg" aria-label="Open menu" />
              }
            >
              <Menu aria-hidden />
            </SheetTrigger>
            <SheetContent className="w-72">
              <SheetHeader>
                <SheetTitle className="font-heading text-lg font-extrabold">
                  <span className="text-foreground">Sheet</span>
                  <span className="text-primary">Sathi</span>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation
                </SheetDescription>
              </SheetHeader>
              <nav
                aria-label="Mobile"
                className="flex flex-col gap-1 px-4"
              >
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    nativeButton={false}
                    render={<Link href={link.href} />}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                      pathname === link.href
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 p-4">

                
               
                <SheetClose
                  nativeButton={false}
                  render={<Link href="/login" />}
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Login
                </SheetClose>
              </div>
             
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
