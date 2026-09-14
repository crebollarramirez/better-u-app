import type { Course } from "@/types/course";

/** Maps a lesson id to whether it has been completed. */
export type CourseCompletion = Record<string, boolean>;

/** Maps a course id to that course's lesson completion map. */
export type ProgressMap = Record<string, CourseCompletion>;

export type CompletionStatus = "not-started" | "in-progress" | "completed";

/** Dashboard filter value — a superset of CompletionStatus with an "All" option and no "not-started" bucket. */
export type CompletionFilter = "All" | "In Progress" | "Completed";

export function countLessons(course: Course): number {
  return course.modules.reduce((sum, courseModule) => sum + courseModule.lessons.length, 0);
}

export function countCompletedLessons(
  course: Course,
  completion: CourseCompletion | undefined,
): number {
  if (!completion) return 0;
  let count = 0;
  for (const courseModule of course.modules) {
    for (const lesson of courseModule.lessons) {
      if (completion[lesson.id]) count += 1;
    }
  }
  return count;
}

export function courseProgressPercent(
  course: Course,
  completion: CourseCompletion | undefined,
): number {
  const total = countLessons(course);
  if (total === 0) return 0;
  return Math.round((countCompletedLessons(course, completion) / total) * 100);
}

export function courseStatus(percent: number): CompletionStatus {
  if (percent >= 100) return "completed";
  if (percent > 0) return "in-progress";
  return "not-started";
}
