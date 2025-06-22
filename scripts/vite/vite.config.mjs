import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolvePkgPath } from '../utils'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],

  resolve: {
    alias: [
      {
        find: 'react',
        replacement: resolvePkgPath('react'),
      },
      // {
      //   find: 'react-dom',
      //   replacement: resolvePkgPath('react-dom'),
      // },
      // {
      //   find: 'hostConfig',
      //   replacement: path.resolve(resolvePkgPath('react-dom'), './src/hostConfig.js'),
      // },
    ],
  },
})
