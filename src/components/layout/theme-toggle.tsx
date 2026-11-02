"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { cn } from "cn";
import { Button } from "@/components/ui/button";

// Hydration detection without setState-in-effect (rejected by the
// react-hooks lint rules): false during SSR, true on the client. React
// renders the server snapshot first, then re-renders with the client one.
const subscribe = () => () => {};
const getHydratedSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = React.useSyncExternalStore(
    subscribe,
    getHydratedSnapshot,
    getServerSnapshot
  );

  // Before hydration the active theme isn't trustworthy (SSR can't know
  // localStorage / prefers-color-scheme), so fall back to the light icon.
  const isDark = hydrated && resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      title="Toggle theme"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn("rounded-full hover:text-primary", className)}
    >
      <span className="relative block size-4">
        <Sun
          aria-hidden
          className={cn(
            "absolute inset-0 size-4 transition-all duration-300 ease-out",
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          )}
        />
        <Moon
          aria-hidden
          className={cn(
            "absolute inset-0 size-5 transition-all duration-300 ease-out",
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          )}
        />
      </span>
    </Button>
  );
}
