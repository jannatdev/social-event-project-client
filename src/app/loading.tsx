
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Navbar Skeleton */}
      <div className="container mx-auto flex items-center justify-between px-4 py-5">
        <Skeleton className="h-9 w-32" />

        <div className="hidden items-center gap-6 md:flex">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>

        <Skeleton className="h-9 w-9 rounded-md md:hidden" />
      </div>

      {/* Hero Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-full max-w-lg" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="mt-3 h-11 w-36 rounded-md" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="mb-8 h-8 w-48" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="space-y-4 rounded-xl border p-4"
            >
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />

              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-9 w-24 rounded-md" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
