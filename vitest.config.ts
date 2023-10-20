import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath } from 'url';
// https://vitejs.dev/config/
export default defineConfig( {
  plugins: [ react(), tsconfigPaths() ],
  test   : {
    // browser: {
    //   enabled: true,
    //   name   : 'chrome', // browser name is required
    // },

    // setupFiles: './src/test/setup.ts',
    alias      : {
      "@": fileURLToPath( new URL( "./src", import.meta.url ) )
    },
    environment: 'jsdom',
    // globals    : true
    // css:true
    coverage: {
      provider: "istanbul"
    },

  },
  base   : "/"
} )