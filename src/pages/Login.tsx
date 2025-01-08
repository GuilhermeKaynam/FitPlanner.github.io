import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate("/dashboard");
    } else {
      alert("Email ou senha inválidos!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Dumbbell className="text-[#f5c518] mb-2" size={48} />
          <h1 className="text-3xl font-bold text-[#1a1a1a]">FitPlanner</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:ring-[#f5c518] focus:border-[#f5c518]"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:ring-[#f5c518] focus:border-[#f5c518]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#f5c518] text-[#1a1a1a] py-2 rounded font-semibold hover:bg-[#e3b616] transition-colors"
          >
            Entrar
          </button>
          <p className="text-center text-gray-600 mt-4">
            Não tem uma conta?{" "}
            <Link to="/register" className="text-[#f5c518] hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
