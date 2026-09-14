import { CATEGORIES, DIFFICULTIES } from "@/lib/courses";
import type { Difficulty } from "@/types/course";
import type { CompletionFilter } from "@/lib/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const selectClassName = "h-10.5 min-w-36 border-zinc-300 bg-white px-3 text-zinc-900 focus-visible:border-slate-500 focus-visible:ring-slate-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50";

const categoryItems = [
  { label: "All Categories", value: "All" },
  ...CATEGORIES.map((value) => ({ label: value, value })),
];

const difficultyItems: Array<{ label: string; value: Difficulty | "All" }> = [
  { label: "All Difficulties", value: "All" },
  ...DIFFICULTIES.map((value) => ({ label: value, value })),
];

const statusItems: Array<{ label: string; value: CompletionFilter }> = [
  { label: "All Statuses", value: "All" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];

export function Filters({
  category,
  onCategoryChange,
  difficulty,
  onDifficultyChange,
  status,
  onStatusChange,
}: {
  category: string;
  onCategoryChange: (value: string) => void;
  difficulty: Difficulty | "All";
  onDifficultyChange: (value: Difficulty | "All") => void;
  status: CompletionFilter;
  onStatusChange: (value: CompletionFilter) => void;
}) {
  return (
    <>
      <Select
        items={categoryItems}
        value={category}
        onValueChange={(value) => value && onCategoryChange(value)}
      >
        <SelectTrigger aria-label="Filter by category" className={selectClassName}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categoryItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        items={difficultyItems}
        value={difficulty}
        onValueChange={(value) => value && onDifficultyChange(value)}
      >
        <SelectTrigger aria-label="Filter by difficulty" className={selectClassName}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {difficultyItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        items={statusItems}
        value={status}
        onValueChange={(value) => value && onStatusChange(value)}
      >
        <SelectTrigger aria-label="Filter by completion status" className={selectClassName}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {statusItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
