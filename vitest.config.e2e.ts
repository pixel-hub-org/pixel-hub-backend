import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig(async () => {
  const tsConfigPaths = (await import('vite-tsconfig-paths')).default

  return {
    test: {
      include: ['**/*.e2e-spec.ts'],
      globals: true,
      root: './',
    },
    plugins: [
      tsConfigPaths(),
      swc.vite({
        module: { type: 'es6' },
      }),
    ],
    resolve: {
      alias: {
        src: resolve(__dirname, './src'),
      },
    },
  }
})
