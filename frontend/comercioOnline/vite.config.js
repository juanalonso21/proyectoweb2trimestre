import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Permite conexiones desde otros dispositivos
    port: 5173,      // Puerto fijo
    strictPort: true // Evita que Vite cambie de puerto
  }
});
