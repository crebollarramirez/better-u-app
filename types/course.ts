export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

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
