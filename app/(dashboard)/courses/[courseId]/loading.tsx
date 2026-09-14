import { CourseDetailSkeleton } from "@/components/courses/CourseDetailSkeleton";

export default function CourseDetailLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading course details"
      className="mx-auto w-full max-w-4xl flex-1 px-6 pt-7 pb-20"
    >
      <span className="sr-only">Loading course details…</span>
      <CourseDetailSkeleton />
    </main>
  );
}
