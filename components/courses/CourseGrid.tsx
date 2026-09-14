import { CourseCard } from "@/components/courses/CourseCard";
import type { Course } from "@/types/course";

export function CourseGrid({
  courses,
}: {
  courses: Array<{ course: Course; progress: number }>;
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
      {courses.map(({ course, progress }, index) => (
        <CourseCard
          key={course.id}
          course={course}
          progress={progress}
          priority={index < 4}
        />
      ))}
    </div>
  );
}
