"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "better-u:theme";
const listeners = new Set<() => void>();

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable (private mode, quota exceeded) — theme still applies for this load
  }
  listeners.forEach((listener) => listener());
}

/**
 * Reads/writes the site-wide light/dark theme. The `dark` class on <html> is what
 * every `dark:` Tailwind utility keys off (see the `@custom-variant dark` in globals.css),
 * so writes here take effect immediately across the whole app, not just this hook's callers.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => applyTheme(next), []);
  const toggleTheme = useCallback(() => applyTheme(getSnapshot() === "dark" ? "light" : "dark"), []);

  return { theme, setTheme, toggleTheme };
}
