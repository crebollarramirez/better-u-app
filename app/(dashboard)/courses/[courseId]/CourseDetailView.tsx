"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LessonChecklist } from "@/components/lessons/LessonChecklist";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { formatDuration } from "@/lib/courses";
import { courseProgressPercent } from "@/lib/progress";
import type { Course } from "@/types/course";

export function CourseDetailView({ course, userId }: { course: Course; userId: string }) {
  const { progress, toggleLesson } = useCourseProgress(userId);
  const router = useRouter();

  const completion = progress[course.id] ?? {};
  const percent = courseProgressPercent(course, completion);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 pt-7 pb-20">
      <Link
        href="/"
        className="mb-4.5 inline-block text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        ‹ Back to Course Catalog
      </Link>

      <>
          <div className="mb-7">
            <div className="mb-3 flex flex-wrap gap-1.5">
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
            <h1 className="mb-2.5 font-serif text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
              {course.title}
            </h1>
            <p className="mb-3.5 max-w-160 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              {course.description}
            </p>
            <div className="mb-5 flex flex-wrap gap-4.5 text-sm text-zinc-500 dark:text-zinc-400">
              <span>Instructor: {course.instructor}</span>
              <span>★ {course.rating}</span>
              <span>{course.enrolledCount.toLocaleString()} enrolled</span>
            </div>
            <div>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">Your progress</span>
                <span className="text-zinc-600 dark:text-zinc-400">{percent}%</span>
              </div>
              <Progress
                value={percent}
                aria-label={`${course.title} progress`}
                className="block gap-0 [&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-track]]:bg-zinc-200 [&_[data-slot=progress-indicator]]:bg-slate-700 dark:[&_[data-slot=progress-track]]:bg-zinc-800 dark:[&_[data-slot=progress-indicator]]:bg-slate-500"
              />
            </div>
          </div>

          <LessonChecklist
            course={course}
            completion={completion}
            onToggleLesson={(lessonId) => toggleLesson(course.id, lessonId)}
            onOpenLesson={({ lessonId }) => router.push(`/courses/${course.id}/lessons/${lessonId}`)}
          />
      </>
    </main>
  );
}
