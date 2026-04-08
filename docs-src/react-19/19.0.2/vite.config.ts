import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../../../docs/react-19/19.0.2',
    emptyOutDir: true
  }
});
