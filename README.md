# Better U — LMS Dashboard

A course catalog and lesson-progress dashboard built with Next.js (App Router), TypeScript, Tailwind CSS, and Clerk authentication. Signed-in users can browse and search a course catalog, filter by category/difficulty/completion, open a course to see its modules and lessons, and check off lessons in a mock lesson player — all persisted client-side per user.

## Architecture

**Routes**

- `app/(auth)/sign-in/[[...sign-in]]`, `app/(auth)/sign-up/[[...sign-up]]` — Clerk-hosted auth flows.
- `app/(dashboard)/page.tsx` — protected course catalog at `/`.
- `app/(dashboard)/courses/[courseId]/page.tsx` — protected course detail and module list.
- `app/(dashboard)/courses/[courseId]/lessons/[lessonId]/page.tsx` — protected, deep-linkable lesson view and mock player.
- `proxy.ts` (Next.js 16's replacement for `middleware.ts`) — `clerkMiddleware` protecting the catalog and course routes.

Route protection is layered: `proxy.ts` gates the routes at the edge, and `app/(dashboard)/layout.tsx` re-checks and redirects server-side for the entire dashboard group.

**Key components**

- `components/layout/Header.tsx` — sticky nav with the light/dark `ThemeToggle` and the Clerk `UserButton` (avatar, account management, sign-out).
- `components/courses/` — `CourseCard`, `CourseGrid`, `Filters`, `SearchBar`, `EmptyState`.
- `components/lessons/` — `LessonChecklist` and `MockVideoPlayer`.
- `components/layout/` — `Header`, `ThemeToggle`, and `UserNav`.
- `app/(dashboard)/CourseCatalogClient.tsx` and `app/(dashboard)/courses/[courseId]/CourseDetailView.tsx` — the client components that own catalog filtering and course progress; everything above the `"use client"` boundary stays a server component.

**Hooks**

- `hooks/useDebouncedValue.ts` — generic debounce, used for the ≥300ms-debounced catalog search.
- `hooks/useCourseProgress.ts` — reads/writes lesson completion via `useSyncExternalStore`, backed by `localStorage` under the key `better-u:progress:<clerkUserId>`. Using `useSyncExternalStore` (rather than `useState` + `useEffect`) avoids a hydration-mismatch flash and keeps every component reading progress in sync without prop drilling a context.
- `hooks/useTheme.ts` — same `useSyncExternalStore` pattern, backed by `localStorage` (`better-u:theme`) and a `dark` class on `<html>` that every `dark:` Tailwind utility keys off (see `@custom-variant dark` in `app/globals.css`). A `beforeInteractive` script in `app/layout.tsx` applies the stored (or OS) preference before first paint to avoid a flash of the wrong theme.

**Lib**

- `lib/courses.ts` — typed access to `courses.json` (`getCourseById`, `formatDuration`, derived `CATEGORIES`).
- `lib/progress.ts` — pure functions for lesson/course completion math (`courseProgressPercent`, `courseStatus`) and the shared `CompletionFilter`/`ProgressMap` types.

**Data**

`courses.json` (repo root) is the only data source, matching the schema in `types/course.ts` exactly — no schema changes. Progress is derived at render time from `courses.json` + the `localStorage` completion map; nothing is duplicated or cached out of sync.

**Design fidelity note:** each lesson is a dedicated `/courses/[courseId]/lessons/[lessonId]` route with a mock player, immediate progress updates, and next-lesson navigation.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Environment variables**:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

## Testing

```bash
npm test
```

Runs the Vitest unit suite (`lib/progress.test.ts`) — the pure lesson/course-completion math in `lib/progress.ts` (`countCompletedLessons`, `courseProgressPercent`, `courseStatus`).

## Deployment

Deploy to Vercel. Set the same environment variables above in the Vercel project settings, then in the Clerk Dashboard → **Domains**, add the deployed URL (e.g. `https://your-app.vercel.app`) as an allowed origin.

## Trade-offs

I prioritized the filtering and search logic over a few smaller checklist interactions. With more time, I would make the module checklist more intuitive: lesson titles need a clearer indication that they link to the lesson page. I would also let users undo completion directly from the lesson page, rather than requiring them to return to the course page and uncheck the lesson there.

## AI Usage

**Tools:** Claude Code, Claude Design 

**Prompts**:

**Prompt given to Claude Design**:
```
We will make a simple responsive UI for a Learning Management System. The simple web app will include a sign-in page (with Clerk). After the user is signed in, they are directed to their dashboard. The dashboard includes courses where courses have their own modules where each module has lessons. 


This is how the courses and lessons are structured:
export type Lesson = {
  id: string;
  title: string;
  durationMinutes: number;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  durationMinutes: number;
  thumbnail: string;
  instructor: string;
  rating: number;
  enrolledCount: number;
  modules: Module[];
};

The dashboard should only display the grid of 12 courses. The course cards must feature a progress bar, a completion badge (when progress is 100%), and metadata tags for category, difficulty and duration. 

The dashboard should include a search bar on top of the grid of courses so we can search through the courses via category, difficulty, and/or completion status. The filters should have these options: Category: Web Development, Data Science, Design, Business, DevOps, Mobile

Difficulty: Beginner, Intermediate, Advanced

Completion Status: All, In Progress (>0% and <100%), Completed (100%)

Clicking a course redirects the user to courses/courseId which will contain all modules for that course. The module should have its own interactive checklist for lessons where each lesson has its own checkbox. Instead of having a whole new page for lesson we will have a modal for a lesson that will display a mock media player, "mark complete" button, and "next lesson" button. 

Also the dashboard and /courseId pages should include a consistent simple header that has a button that takes the user back to the courses dashboard and user clerk profile picture that toggles authentication actions like signout. 

Also create loading skeletons for the course card and for the courseId page.
```
**Prompt given to Claude Code**:
```
add search and filtering to the course catalog. Search should match against course title and description, debounced by at least 300ms so it doesn't refilter on every keystroke. Add three filters: category (derived from the course data, not hardcoded), difficulty (Beginner/Intermediate/Advanced), and completion status (All / In Progress / Completed), where completion is based on each course's percentage of finished lessons. All the filters and search should combine together (AND logic), and show an empty state when nothing matches. Reuse courseProgressPercent/courseStatus from lib/progress.ts for the completion math instead of recalculating it.
```

**Workflow:**

1. I used **Claude Design** to create all visual designs, including the dashboard, filters, course-detail page, and lesson page. The mockup used placeholder data.
2. I used **Claude Code** to implement those visuals in the application, translating the mockup into typed Next.js and Tailwind components and connecting it to the real `courses.json` data.
3. I then used **Claude** to implement the application functionality and authentication logic, including progress tracking, search and filters, and Clerk sign-in.


**One thing it got wrong, and the fix:** The first version of `useCourseProgress` read `localStorage` in a `useEffect` and called `setState` synchronously inside it (a common pattern for "load from storage on mount"). The project's ESLint config flags exactly this (`react-hooks/set-state-in-effect`) because it can cause a cascading extra render and a hydration flash. The fix was to rebuild the hook on `useSyncExternalStore` with a small in-memory cache per user id — the pattern React itself recommends for syncing external stores like `localStorage` — which also removed the need for a separate "hydrated" flag that the first version was using to gate the loading skeleton.

## If I had more time

- Extend the unit suite to `useDebouncedValue` and the catalog's filter/search predicate.
- Theme Clerk's `<SignIn>`/`<SignUp>` widgets to follow the site's light/dark toggle instead of always rendering light.
- Add test suite for `filtering and searching` logic.
- Add lesson-gating logic so users must complete each lesson before checking off future lessons.
