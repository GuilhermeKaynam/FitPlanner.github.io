export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'trainer';
  height?: number;
  weight?: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface Workout {
  id: string;
  studentId: string;
  trainerId: string;
  name: string;
  exercises: Exercise[];
  date: string;
}