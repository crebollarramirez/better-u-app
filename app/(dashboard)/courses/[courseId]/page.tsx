import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { CourseDetailView } from "@/app/(dashboard)/courses/[courseId]/CourseDetailView";
import { getCourseById } from "@/lib/courses";

export default async function CourseDetailPage(
  props: PageProps<"/courses/[courseId]">,
) {
  const { courseId } = await props.params;
  const course = getCourseById(courseId);
  if (!course) notFound();

  const { userId } = await auth();

  return <CourseDetailView course={course} userId={userId!} />;
}
