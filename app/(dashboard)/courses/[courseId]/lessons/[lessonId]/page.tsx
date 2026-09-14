import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { MockVideoPlayer } from "@/components/lessons/MockVideoPlayer";
import { getCourseById } from "@/lib/courses";

export default async function LessonPage(
  props: PageProps<"/courses/[courseId]/lessons/[lessonId]">,
) {
  const { courseId, lessonId } = await props.params;
  const { isAuthenticated, redirectToSignIn, userId } = await auth();

  if (!isAuthenticated) {
    return redirectToSignIn({
      returnBackUrl: `/courses/${courseId}/lessons/${lessonId}`,
    });
  }

  const course = getCourseById(courseId);
  if (!course) notFound();

  const lessons = course.modules.flatMap((courseModule) =>
    courseModule.lessons.map((lesson) => ({
      lesson,
      moduleTitle: courseModule.title,
    })),
  );
  const lessonIndex = lessons.findIndex(({ lesson }) => lesson.id === lessonId);
  if (lessonIndex === -1) notFound();

  const activeLesson = lessons[lessonIndex];
  const nextLesson = lessons[lessonIndex + 1];

  return (
    <MockVideoPlayer
      courseId={course.id}
      lesson={activeLesson.lesson}
      moduleTitle={activeLesson.moduleTitle}
      lessonNumber={lessonIndex + 1}
      lessonCount={lessons.length}
      nextLessonHref={
        nextLesson ? `/courses/${course.id}/lessons/${nextLesson.lesson.id}` : undefined
      }
      userId={userId}
    />
  );
}
