import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      __API_KEY__: JSON.stringify(env.API_KEY),
      __AUTH_DOMAIN__: JSON.stringify(env.AUTH_DOMAIN),
      __PROJECT_ID__: JSON.stringify(env.PROJECT_ID),
      __STORAGE_BUCKET__: JSON.stringify(env.STORAGE_BUCKET),
      __MESSAGING_SENDER_ID__: JSON.stringify(env.MESSAGING_SENDER_ID),
      __APP_ID__: JSON.stringify(env.APP_ID),
      __MEASUREMENT_ID__: JSON.stringify(env.MEASUREMENT_ID)
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/')
      }
    }
  }
})
