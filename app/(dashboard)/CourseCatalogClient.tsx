"use client";

import { useMemo, useState } from "react";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { EmptyState } from "@/components/courses/EmptyState";
import { Filters } from "@/components/courses/Filters";
import { SearchBar } from "@/components/courses/SearchBar";
import { Button } from "@/components/ui/button";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { courseProgressPercent, courseStatus, type CompletionFilter } from "@/lib/progress";
import type { Course, Difficulty } from "@/types/course";

export function CourseCatalogClient({ courses, userId }: { courses: Course[]; userId: string }) {
  const { progress } = useCourseProgress(userId);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
  const [status, setStatus] = useState<CompletionFilter>("All");

  const debouncedSearch = useDebouncedValue(search, 300);

  const hasActiveFilters =
    search !== "" || category !== "All" || difficulty !== "All" || status !== "All";

  function handleClearFilters() {
    setSearch("");
    setCategory("All");
    setDifficulty("All");
    setStatus("All");
  }

  const enriched = useMemo(
    () =>
      courses.map((course) => ({
        course,
        progress: courseProgressPercent(course, progress[course.id]),
      })),
    [courses, progress],
  );

  const filtered = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    return enriched.filter(({ course, progress: percent }) => {
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query);
      const matchesCategory = category === "All" || course.category === category;
      const matchesDifficulty = difficulty === "All" || course.difficulty === difficulty;
      const state = courseStatus(percent);
      const matchesStatus =
        status === "All" ||
        (status === "In Progress" && state === "in-progress") ||
        (status === "Completed" && state === "completed");
      return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
    });
  }, [enriched, debouncedSearch, category, difficulty, status]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8 pb-16">
      <h1 className="font-serif text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
        My Courses
      </h1>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-1 mb-6 text-sm text-zinc-500 dark:text-zinc-400"
      >
        {`${filtered.length} of ${enriched.length} courses`}
      </p>

      <div className="mb-7 flex flex-wrap items-center gap-2.5">
        <SearchBar value={search} onChange={setSearch} />
        <Filters
          category={category}
          onCategoryChange={setCategory}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          status={status}
          onStatusChange={setStatus}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          disabled={!hasActiveFilters}
          className="text-zinc-500 hover:text-zinc-700 focus-visible:ring-slate-500/20 disabled:opacity-40 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          Clear filters
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <CourseGrid courses={filtered} />
      )}
    </main>
  );
}
