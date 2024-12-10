import React from 'react';
import { Workout } from '../types';
import { Dumbbell } from 'lucide-react';

interface WorkoutListProps {
  workouts: Workout[];
}

export const WorkoutList: React.FC<WorkoutListProps> = ({ workouts }) => {
  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <div key={workout.id} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Dumbbell className="text-[#f5c518]" />
            <h3 className="text-xl font-semibold">{workout.name}</h3>
          </div>
          
          <div className="space-y-4">
            {workout.exercises.map((exercise) => (
              <div key={exercise.id} className="border-t pt-4">
                <h4 className="font-medium mb-2">{exercise.name}</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Séries:</span>{' '}
                    <span className="font-medium">{exercise.sets}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Repetições:</span>{' '}
                    <span className="font-medium">{exercise.reps}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Peso:</span>{' '}
                    <span className="font-medium">{exercise.weight}kg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Data: {new Date(workout.date).toLocaleDateString()}
          </div>
        </div>
      ))}
      
      {workouts.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Nenhum treino encontrado.
        </div>
      )}
    </div>
  );
};