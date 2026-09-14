import { Input } from "@/components/ui/input";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search by title or description"
      aria-label="Search courses"
      className="h-10.5 min-w-55 flex-1 border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus-visible:border-slate-500 focus-visible:ring-slate-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
    />
  );
}
