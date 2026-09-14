import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { UserNav } from "@/components/layout/UserNav";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-black/95">
      <div className="mx-auto flex h-15 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 shrink-0 items-center justify-center rounded-md bg-slate-700 px-2 font-serif text-sm font-bold tracking-wide text-white dark:bg-slate-500">
            LMS
          </span>
          <span className="hidden font-serif text-lg font-semibold text-zinc-900 sm:inline dark:text-zinc-50">
            Learning Management System
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
