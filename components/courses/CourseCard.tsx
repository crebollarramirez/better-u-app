import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatDuration } from "@/lib/courses";
import type { Course } from "@/types/course";

export function CourseCard({
  course,
  progress,
  priority,
}: {
  course: Course;
  progress: number;
  priority?: boolean;
}) {
  const isCompleted = progress >= 100;

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="relative h-35 w-full shrink-0 bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={course.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 90vw"
          className="object-cover"
          priority={priority}
        />
        {isCompleted && (
          <Badge className="absolute top-2.5 right-2.5 h-auto bg-slate-700 px-2.5 py-1 font-semibold text-white shadow dark:bg-slate-500">
            ✓ Completed
          </Badge>
        )}
      </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline" className="font-normal text-zinc-600 dark:text-zinc-400">
            {course.category}
          </Badge>
          <Badge variant="outline" className="font-normal text-zinc-600 dark:text-zinc-400">
            {course.difficulty}
          </Badge>
          <Badge variant="outline" className="font-normal text-zinc-600 dark:text-zinc-400">
            {formatDuration(course.durationMinutes)}
          </Badge>
        </div>
        <h3 className="line-clamp-2 font-serif text-base leading-snug font-semibold text-zinc-900 dark:text-zinc-50">
          {course.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">by {course.instructor}</p>
        <div className="mt-auto pt-2">
          <Progress
            value={progress}
            aria-label={`${course.title} progress`}
            className="block gap-0 [&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:bg-zinc-200 [&_[data-slot=progress-indicator]]:bg-slate-700 dark:[&_[data-slot=progress-track]]:bg-zinc-800 dark:[&_[data-slot=progress-indicator]]:bg-slate-500"
          />
          <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            {progress}% complete
          </p>
        </div>
      </div>
    </Link>
  );
}
