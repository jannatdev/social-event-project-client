import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PagePlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-center px-4 -my-20 text-center sm:px-6">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-accent px-3 py-1 text-xs font-semibold tracking-wide text-accent-foreground uppercase">
        Coming soon
      </span>
      <h1 className="mt-5 font-heading text-3xl text-green-600 font-extrabold tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-base text-muted-foreground sm:text-lg">
        {description}
      </p>
      <Button
        variant="outline"
        nativeButton={false}
        render={<Link href="/" />}
        className="mt-8"
      >
        <ArrowLeft aria-hidden />
        Back to home
      </Button>
    </div>
  );
}
