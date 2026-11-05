import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PagePlaceholder({
  title,
  
}: {
  title: string;
  
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-center px-4 -my-40 text-center sm:px-6">
      
      <h1 className=" font-heading text-3xl text-green-600 font-extrabold tracking-tight sm:text-5xl">
        {title}
      </h1>
      
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
