import { Skeleton } from "@/components/ui/skeleton";

export function CourseDetailSkeleton() {
  return (
    <div>
      <Skeleton className="mb-3.5 h-5 w-45" />
      <Skeleton className="mb-3 h-8 w-3/5" />
      <Skeleton className="mb-2 h-3.5 w-11/12" />
      <Skeleton className="mb-5 h-3.5 w-3/4" />
      <Skeleton className="mb-8 h-2 w-full" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <Skeleton className="mb-3.5 h-4 w-2/5" />
            <Skeleton className="mb-2.5 h-3 w-full" />
            <Skeleton className="mb-2.5 h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
