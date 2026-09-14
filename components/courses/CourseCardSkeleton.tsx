import { Skeleton } from "@/components/ui/skeleton";

export function CourseCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <Skeleton className="h-35 w-full rounded-none" />
      <div className="flex flex-col gap-3 p-4">
        <Skeleton className="h-3 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="mt-2 h-1.5 w-full" />
      </div>
    </div>
  );
}
