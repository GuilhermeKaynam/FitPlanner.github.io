import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useWorkoutStore } from '../store/useWorkoutStore';
import { WorkoutForm } from '../components/WorkoutForm';
import { WorkoutList } from '../components/WorkoutList';
import { Users } from 'lucide-react';

export const Workouts: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const users = useAuthStore((state) => state.users);
  const { addWorkout, getWorkoutsByStudent, getWorkoutsByTrainer } = useWorkoutStore();
  const [selectedStudent, setSelectedStudent] = useState('');

  if (!user) return null;

  const students = users.filter((u) => u.role === 'student');
  const isTrainer = user.role === 'trainer';

  const workouts = isTrainer
    ? selectedStudent
      ? getWorkoutsByStudent(selectedStudent)
      : getWorkoutsByTrainer(user.id)
    : getWorkoutsByStudent(user.id);

  const handleWorkoutSubmit = (name: string, exercises: any[]) => {
    if (!selectedStudent) return;
    
    addWorkout({
      name,
      exercises,
      studentId: selectedStudent,
      trainerId: user.id,
      date: new Date().toISOString(),
    });
    
    alert('Treino cadastrado com sucesso!');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1a1a1a]">Treinos</h1>

      {isTrainer && (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="text-[#f5c518]" />
            <h2 className="text-xl font-semibold">Cadastrar Novo Treino</h2>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Selecione o Aluno</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Selecione um aluno</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          {selectedStudent && <WorkoutForm studentId={selectedStudent} onSubmit={handleWorkoutSubmit} />}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          {isTrainer ? 'Treinos Cadastrados' : 'Seus Treinos'}
        </h2>
        <WorkoutList workouts={workouts} />
      </div>
    </div>
  );
};