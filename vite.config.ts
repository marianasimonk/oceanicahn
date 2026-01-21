
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  // Vercel and other CI environments usually inject variables into process.env.
  // We check process.env first, then the loaded .env files.
  const apiKey = process.env.API_KEY || env.API_KEY;

  if (!apiKey) {
      console.warn("\x1b[33m%s\x1b[0m", "⚠️  WARNING: API_KEY is not defined in your environment variables. The AI features will not work!");
  } else {
      console.log("\x1b[32m%s\x1b[0m", "✅ SUCCESS: API_KEY found in build environment.");
  }

  return {
    plugins: [react()],
    define: {
      // Stringify the API key to ensure it's treated as a string value in the code
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
  };
});
