import { CourseCardSkeleton } from "@/components/courses/CourseCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseCatalogLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading course catalog"
      className="mx-auto w-full max-w-6xl flex-1 px-6 py-8 pb-16"
    >
      <span className="sr-only">Loading courses…</span>
      <Skeleton className="h-9 w-44" />
      <Skeleton className="mt-2 mb-6 h-4 w-28" />

      <div className="mb-7 flex flex-wrap items-center gap-2.5" aria-hidden="true">
        <Skeleton className="h-10.5 min-w-55 flex-1 rounded-lg" />
        <Skeleton className="h-10.5 w-40 rounded-lg" />
        <Skeleton className="h-10.5 w-36 rounded-lg" />
        <Skeleton className="h-10.5 w-32 rounded-lg" />
        <Skeleton className="h-5 w-20" />
      </div>

      <div
        aria-hidden="true"
        className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <CourseCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}
