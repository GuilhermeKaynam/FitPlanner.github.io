import { create } from 'zustand';
import { Workout, Exercise } from '../types';

interface WorkoutState {
  workouts: Workout[];
  addWorkout: (workout: Omit<Workout, 'id'>) => void;
  getWorkoutsByStudent: (studentId: string) => Workout[];
  getWorkoutsByTrainer: (trainerId: string) => Workout[];
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  workouts: [],
  addWorkout: (workout) => {
    const newWorkout = { ...workout, id: Math.random().toString(36).substr(2, 9) };
    set((state) => ({ workouts: [...state.workouts, newWorkout] }));
  },
  getWorkoutsByStudent: (studentId) => {
    return get().workouts.filter((workout) => workout.studentId === studentId);
  },
  getWorkoutsByTrainer: (trainerId) => {
    return get().workouts.filter((workout) => workout.trainerId === trainerId);
  },
}));