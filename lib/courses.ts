import coursesData from "@/courses.json";
import type { Course, Difficulty } from "@/types/course";

export const courses: Course[] = coursesData as Course[];

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function getAllLessons(course: Course) {
  return course.modules.flatMap((courseModule) => courseModule.lessons);
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (hours === 0) return `${remaining}m`;
  if (remaining === 0) return `${hours}h`;
  return `${hours}h ${remaining}m`;
}

export const CATEGORIES: string[] = Array.from(
  new Set(courses.map((course) => course.category)),
).sort();

export const DIFFICULTIES: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];
