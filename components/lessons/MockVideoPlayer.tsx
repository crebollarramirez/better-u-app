"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/lib/courses";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import type { Lesson } from "@/types/course";

export function MockVideoPlayer({
  courseId,
  lesson,
  moduleTitle,
  lessonNumber,
  lessonCount,
  nextLessonHref,
  userId,
}: {
  courseId: string;
  lesson: Lesson;
  moduleTitle: string;
  lessonNumber: number;
  lessonCount: number;
  nextLessonHref?: string;
  userId: string;
}) {
  const { progress, markLessonComplete } = useCourseProgress(userId);
  const isCompleted = !!progress[courseId]?.[lesson.id];

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 pt-7 pb-20">
      <Link
        href={`/courses/${courseId}`}
        className="mb-4.5 inline-block text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        ‹ Back to Course
      </Link>
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{moduleTitle}</p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Lesson {lessonNumber} of {lessonCount}
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          {lesson.title}
        </h1>

        <div className="mt-6 flex aspect-video flex-col items-center justify-center gap-2.5 rounded-xl bg-zinc-800">
          <div className="flex h-13 w-13 items-center justify-center rounded-full border-2 border-white">
            <div className="ml-0.5 h-0 w-0 border-y-9 border-l-14 border-y-transparent border-l-white" />
          </div>
          <p className="font-mono text-xs text-zinc-400">
            mock media player · {formatDuration(lesson.durationMinutes)}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <Button
            type="button"
            size="lg"
            onClick={() => markLessonComplete(courseId, lesson.id)}
            disabled={isCompleted}
            className={cn(
              "h-10 px-5 text-sm font-semibold disabled:cursor-default",
              isCompleted
                ? "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                : "bg-slate-700 text-white hover:bg-slate-600 dark:bg-slate-500 dark:hover:bg-slate-400",
            )}
          >
            {isCompleted ? "✓ Completed" : "Mark Complete"}
          </Button>
          <Link
            href={nextLessonHref ?? `/courses/${courseId}`}
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "h-10 border-zinc-300 px-5 font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-50 dark:hover:bg-zinc-900",
            })}
          >
            {nextLessonHref ? "Next Lesson →" : "Finish Course"}
          </Link>
        </div>
      </section>
    </main>
  );
}
