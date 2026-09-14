export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-700">
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        No courses match your filters.
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Try a different search term or clear a filter.
      </p>
    </div>
  );
}
