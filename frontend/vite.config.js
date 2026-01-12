import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  console.log('Loaded VITE_BACKEND_URL:', env.VITE_BACKEND_URL);
  return defineConfig({
    plugins: [react()],
    preview: {
      allowedHosts: [env.VITE_BACKEND_URL]
    },
  });
};
