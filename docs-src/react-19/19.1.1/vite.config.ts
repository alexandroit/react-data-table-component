import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../../../docs/react-19/19.1.1',
    emptyOutDir: true
  }
});
