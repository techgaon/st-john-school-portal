import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/st-john-school-portal/',
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
});
