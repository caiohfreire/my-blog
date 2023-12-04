import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Certifique-se de ajustar conforme necessário ('/' se estiver na raiz, '/seu-app/' se estiver em um subdiretório)
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Se estiver usando uma API, configure um proxy
    },
  },
  build: {
    outDir: 'dist', // Certifique-se de que corresponde ao seu diretório de saída
  },
});
