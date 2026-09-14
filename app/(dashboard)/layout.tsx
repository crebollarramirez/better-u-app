import { auth } from "@clerk/nextjs/server";
import { Header } from "@/components/layout/Header";

export default async function DashboardLayout({ children }: LayoutProps<"/">) {
  const { isAuthenticated, redirectToSignIn } = await auth();

  if (!isAuthenticated) {
    return redirectToSignIn({ returnBackUrl: "/" });
  }

  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-50 dark:bg-black">
      <Header />
      {children}
    </div>
  );
}
