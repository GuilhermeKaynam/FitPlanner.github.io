import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' as const,
    height: '',
    weight: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = register({
      ...formData,
      height: formData.height ? Number(formData.height) : undefined,
      weight: formData.weight ? Number(formData.weight) : undefined,
    });

    if (success) {
      navigate('/login');
    } else {
      alert('Email já cadastrado!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Dumbbell className="text-[#f5c518] mb-2" size={48} />
          <h1 className="text-3xl font-bold text-[#1a1a1a]">Cadastro FitPlanner</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-[#f5c518] focus:border-[#f5c518]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-[#f5c518] focus:border-[#f5c518]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-[#f5c518] focus:border-[#f5c518]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Função</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-[#f5c518] focus:border-[#f5c518]"
            >
              <option value="student">Aluno</option>
              <option value="trainer">Professor</option>
            </select>
          </div>

          {formData.role === 'student' && (
            <>
              <div>
                <label className="block text-gray-700 mb-2">Altura (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-[#f5c518] focus:border-[#f5c518]"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Peso (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-[#f5c518] focus:border-[#f5c518]"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-[#f5c518] text-[#1a1a1a] py-2 rounded font-semibold hover:bg-[#e3b616] transition-colors"
          >
            Cadastrar
          </button>

          <p className="text-center text-gray-600 mt-4">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-[#f5c518] hover:underline">
              Faça login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};