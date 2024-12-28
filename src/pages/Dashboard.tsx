import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { calculateIMC, getIMCCategory } from '../utils/imc';
import { Activity, Users } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  const imc = user.weight && user.height ? calculateIMC(user.weight, user.height) : null;
  const imcCategory = imc ? getIMCCategory(imc) : null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1a1a1a]">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="text-[#f5c518]" />
            <h2 className="text-xl font-semibold">Perfil</h2>
          </div>
          <div className="space-y-2">
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Função:</strong> {user.role === 'trainer' ? 'Professor' : 'Aluno'}</p>
            {user.role === 'student' && (
              <>
                <p><strong>Altura:</strong> {user.height}cm</p>
                <p><strong>Peso:</strong> {user.weight}kg</p>
              </>
            )}
          </div>
        </div>

        {user.role === 'student' && imc && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="text-[#f5c518]" />
              <h2 className="text-xl font-semibold">IMC</h2>
            </div>
            <div className="space-y-2">
              <p><strong>Seu IMC:</strong> {imc}</p>
              <p><strong>Classificação:</strong> {imcCategory}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};