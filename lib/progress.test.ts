import { describe, expect, it } from "vitest";
import { countCompletedLessons, courseProgressPercent, courseStatus } from "@/lib/progress";
import type { Course } from "@/types/course";

const course: Course = {
  id: "course-1",
  title: "Test Course",
  description: "A course used for testing.",
  category: "Web Development",
  difficulty: "Beginner",
  durationMinutes: 30,
  thumbnail: "",
  instructor: "Test Instructor",
  rating: 5,
  enrolledCount: 0,
  modules: [
    {
      id: "mod-1",
      title: "Module 1",
      lessons: [
        { id: "lesson-1", title: "Lesson 1", durationMinutes: 10 },
        { id: "lesson-2", title: "Lesson 2", durationMinutes: 10 },
      ],
    },
    {
      id: "mod-2",
      title: "Module 2",
      lessons: [{ id: "lesson-3", title: "Lesson 3", durationMinutes: 10 }],
    },
  ],
};

describe("countCompletedLessons", () => {
  it("returns 0 when completion is undefined", () => {
    expect(countCompletedLessons(course, undefined)).toBe(0);
  });

  it("counts only completed lessons across all modules", () => {
    const completion = { "lesson-1": true, "lesson-3": true };
    expect(countCompletedLessons(course, completion)).toBe(2);
  });

  it("ignores completion entries for lessons that aren't in the course", () => {
    const completion = { "lesson-1": true, "some-other-course-lesson": true };
    expect(countCompletedLessons(course, completion)).toBe(1);
  });
});

describe("courseProgressPercent", () => {
  it("returns 0 for a course with no completed lessons", () => {
    expect(courseProgressPercent(course, {})).toBe(0);
  });

  it("rounds partial completion to the nearest percent", () => {
    // 1 of 3 lessons done => 33.33...% rounds to 33
    expect(courseProgressPercent(course, { "lesson-1": true })).toBe(33);
  });

  it("returns 100 when every lesson is completed", () => {
    const completion = { "lesson-1": true, "lesson-2": true, "lesson-3": true };
    expect(courseProgressPercent(course, completion)).toBe(100);
  });
});

describe("courseStatus", () => {
  it("returns \"not-started\" for 0%", () => {
    expect(courseStatus(0)).toBe("not-started");
  });

  it("returns \"in-progress\" for a percentage between 0 and 100", () => {
    expect(courseStatus(45)).toBe("in-progress");
  });

  it("returns \"completed\" at 100%", () => {
    expect(courseStatus(100)).toBe("completed");
  });
});
