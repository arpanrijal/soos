import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {

  return defineConfig({
    plugins: [react()],
    allowedHosts: [
      'soos-o0d5.onrender.com',
      'soos-backend.onrender.com',
      'localhost'
    ],
  });
};
