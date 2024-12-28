import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/FrontEnd-FitPlanner/', // Adicione o nome do repositório aqui
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
