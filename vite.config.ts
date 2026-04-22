import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/components/ui/**'],
      exclude: ['**/*.module.css', '**/*.css'],
      // Branch coverage no puede llegar al 100% en JSX: Istanbul cuenta branches
      // internos del código transpilado (React.createElement, spread de props,
      // template literals con acceso dinámico a CSS Modules) que son inalcanzables
      // desde tests de usuario. Statements/Functions/Lines sí son 100%.
      thresholds: {
        statements: 100,
        functions: 100,
        lines: 100,
        branches: 60,
      },
    },
  },
})
