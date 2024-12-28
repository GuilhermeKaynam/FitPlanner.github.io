import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dumbbell, LogOut, Home, Dumbbell as Workout } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-[#1a1a1a] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Dumbbell className="text-[#f5c518]" size={24} />
            <span className="text-xl font-bold">FitPlanner</span>
          </div>
          {user && (
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="flex items-center space-x-1 hover:text-[#f5c518]">
                  <Home size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/workouts" className="flex items-center space-x-1 hover:text-[#f5c518]">
                  <Workout size={20} />
                  <span>Treinos</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <span>Olá, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-[#f5c518]"
                >
                  <LogOut size={20} />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <main className="container mx-auto py-8 px-4">{children}</main>
    </div>
  );
};