import { formatDuration } from "@/lib/courses";
import type { CourseCompletion } from "@/lib/progress";
import type { Course } from "@/types/course";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export type ActiveLesson = { moduleId: string; lessonId: string };

export function LessonChecklist({
  course,
  completion,
  onToggleLesson,
  onOpenLesson,
}: {
  course: Course;
  completion: CourseCompletion;
  onToggleLesson: (lessonId: string) => void;
  onOpenLesson: (lesson: ActiveLesson) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {course.modules.map((courseModule) => {
        const doneCount = courseModule.lessons.filter((lesson) => completion[lesson.id]).length;

        return (
          <div
            key={courseModule.id}
            className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
          >
            <div className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4.5 py-3.5 dark:border-zinc-800 dark:bg-zinc-900">
              <span className="font-serif text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {courseModule.title}
              </span>
              <span className="text-xs whitespace-nowrap text-zinc-500 dark:text-zinc-400">
                {doneCount}/{courseModule.lessons.length} complete
              </span>
            </div>
            {courseModule.lessons.map((lesson) => {
              const done = !!completion[lesson.id];
              return (
                <div
                  key={lesson.id}
                  className="flex items-center gap-3 border-b border-zinc-100 px-4.5 py-3 last:border-b-0 dark:border-zinc-900"
                >
                  <Checkbox
                    checked={done}
                    onCheckedChange={() => onToggleLesson(lesson.id)}
                    aria-label={`Mark "${lesson.title}" as ${done ? "incomplete" : "complete"}`}
                    className="size-4.5 cursor-pointer data-checked:border-slate-700 data-checked:bg-slate-700 dark:data-checked:border-slate-500 dark:data-checked:bg-slate-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => onOpenLesson({ moduleId: courseModule.id, lessonId: lesson.id })}
                    className="h-auto min-w-0 flex-1 justify-between gap-3 rounded-md px-1 py-1 text-left font-normal hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  >
                    <span
                      className={cn(
                        "truncate text-sm",
                        done
                          ? "text-zinc-500 line-through dark:text-zinc-400"
                          : "text-zinc-900 dark:text-zinc-100",
                      )}
                    >
                      {lesson.title}
                    </span>
                    <span className="font-mono text-xs whitespace-nowrap text-zinc-500 dark:text-zinc-400">
                      {formatDuration(lesson.durationMinutes)}
                    </span>
                  </Button>
                  <span aria-hidden className="text-zinc-300 dark:text-zinc-600">
                    ›
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
