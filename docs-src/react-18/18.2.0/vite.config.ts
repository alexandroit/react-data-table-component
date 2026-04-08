import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../../../docs/react-18/18.2.0',
    emptyOutDir: true
  }
});
