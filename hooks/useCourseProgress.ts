"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { CourseCompletion, ProgressMap } from "@/lib/progress";

function storageKey(userId: string): string {
  return `better-u:progress:${userId}`;
}

function readFromStorage(userId: string): ProgressMap {
  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function writeToStorage(userId: string, progress: ProgressMap): void {
  try {
    window.localStorage.setItem(storageKey(userId), JSON.stringify(progress));
  } catch {
    // localStorage unavailable (private mode, quota exceeded) — in-memory state still updates
  }
}

const EMPTY_PROGRESS: ProgressMap = {};
const cache = new Map<string, ProgressMap>();
const listeners = new Set<() => void>();

function getSnapshot(userId: string): ProgressMap {
  if (!cache.has(userId)) cache.set(userId, readFromStorage(userId));
  return cache.get(userId)!;
}

function setSnapshot(userId: string, next: ProgressMap): void {
  cache.set(userId, next);
  writeToStorage(userId, next);
  listeners.forEach((callback) => callback());
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getServerSnapshot(): ProgressMap {
  return EMPTY_PROGRESS;
}

/**
 * Reads and writes lesson completion, persisted client-side in localStorage
 * under a key scoped to the signed-in Clerk user.
 */
export function useCourseProgress(userId: string) {
  const progress = useSyncExternalStore(
    subscribe,
    () => getSnapshot(userId),
    getServerSnapshot,
  );

  const toggleLesson = useCallback((courseId: string, lessonId: string) => {
    const prev = getSnapshot(userId);
    const courseCompletion: CourseCompletion = { ...(prev[courseId] ?? {}) };
    if (courseCompletion[lessonId]) {
      delete courseCompletion[lessonId];
    } else {
      courseCompletion[lessonId] = true;
    }
    setSnapshot(userId, { ...prev, [courseId]: courseCompletion });
  }, [userId]);

  const markLessonComplete = useCallback((courseId: string, lessonId: string) => {
    const prev = getSnapshot(userId);
    if (prev[courseId]?.[lessonId]) return;
    setSnapshot(userId, {
      ...prev,
      [courseId]: { ...(prev[courseId] ?? {}), [lessonId]: true },
    });
  }, [userId]);

  return { progress, toggleLesson, markLessonComplete };
}
