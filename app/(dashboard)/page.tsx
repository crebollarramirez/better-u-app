import { auth } from "@clerk/nextjs/server";
import { CourseCatalogClient } from "@/app/(dashboard)/CourseCatalogClient";
import { courses } from "@/lib/courses";

export default async function DashboardPage() {
  const { isAuthenticated, redirectToSignIn, userId } = await auth();

  if (!isAuthenticated) {
    return redirectToSignIn({ returnBackUrl: "/" });
  }

  return <CourseCatalogClient courses={courses} userId={userId} />;
}
