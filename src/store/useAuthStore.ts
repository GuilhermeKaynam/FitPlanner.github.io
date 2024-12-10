import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  register: (user: Omit<User, 'id'>) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  users: [],
  login: (email, password) => {
    const users = get().users;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      set({ user });
      return true;
    }
    return false;
  },
  register: (newUser) => {
    const users = get().users;
    if (users.some(u => u.email === newUser.email)) {
      return false;
    }
    const user = { ...newUser, id: Math.random().toString(36).substr(2, 9) };
    set(state => ({ users: [...state.users, user] }));
    return true;
  },
  logout: () => set({ user: null }),
}));