import React, { useState } from 'react';
import { Exercise } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface WorkoutFormProps {
  studentId: string;
  onSubmit: (name: string, exercises: Exercise[], studentId: string) => void; // Atualizado para incluir studentId
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({ studentId, onSubmit }) => {
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<Omit<Exercise, 'id'>[]>([]);

  const handleAddExercise = () => {
    setExercises([...exercises, { name: '', sets: 0, reps: 0, weight: 0 }]);
  };

  const handleExerciseChange = (index: number, field: keyof Exercise, value: string | number) => {
    const newExercises = [...exercises];
    newExercises[index] = {
      ...newExercises[index],
      [field]: field === 'name' ? value : Number(value),
    };
    setExercises(newExercises);
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const exercisesWithIds = exercises.map(ex => ({
      ...ex,
      id: Math.random().toString(36).substr(2, 9),
    }));

    // Passando studentId para a função onSubmit
    onSubmit(workoutName, exercisesWithIds, studentId);
    setWorkoutName('');
    setExercises([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 mb-2">Nome do Treino</label>
        <input
          type="text"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Exercícios</h3>
          <button
            type="button"
            onClick={handleAddExercise}
            className="flex items-center space-x-1 text-[#f5c518] hover:text-[#e3b616]"
          >
            <Plus size={20} />
            <span>Adicionar Exercício</span>
          </button>
        </div>

        {exercises.map((exercise, index) => (
          <div key={index} className="p-4 border rounded space-y-4">
            <div className="flex justify-between">
              <h4 className="font-medium">Exercício {index + 1}</h4>
              <button
                type="button"
                onClick={() => handleRemoveExercise(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Séries</label>
                <input
                  type="number"
                  value={exercise.sets}
                  onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Repetições</label>
                <input
                  type="number"
                  value={exercise.reps}
                  onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Peso (kg)</label>
                <input
                  type="number"
                  value={exercise.weight}
                  onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                  min="0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={exercises.length === 0}
        className="w-full bg-[#f5c518] text-[#1a1a1a] py-2 rounded font-semibold hover:bg-[#e3b616] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Salvar Treino
      </button>
    </form>
  );
};
