import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';

function chatDevServerPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'chat-dev-server-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/chat' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              // Ensure process.env has the loaded keys
              process.env.GROQ_API_KEY = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
              process.env.GEMINI_API_KEY = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
              process.env.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
              process.env.CLAUDE_API_KEY = env.CLAUDE_API_KEY || process.env.CLAUDE_API_KEY;

              const { messages } = JSON.parse(body || '{}');
              const { default: handler } = await import('./api/chat');
              
              const mockReq = { 
                method: 'POST', 
                body: { messages }, 
                headers: {
                  ...req.headers,
                  'x-groq-key': env.GROQ_API_KEY || process.env.GROQ_API_KEY,
                  'x-gemini-key': env.GEMINI_API_KEY || process.env.GEMINI_API_KEY,
                  'x-api-key': env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY
                }
              };
              const mockRes = {
                setHeader: (k: string, v: string) => res.setHeader(k, v),
                status: (code: number) => ({
                  json: (data: any) => {
                    res.statusCode = code;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                  },
                  end: () => res.end()
                })
              };
              await handler(mockReq, mockRes);
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  process.env.GROQ_API_KEY = env.GROQ_API_KEY;
  process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  process.env.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY;
  process.env.CLAUDE_API_KEY = env.CLAUDE_API_KEY;

  return {
    plugins: [react(), tailwindcss(), chatDevServerPlugin(env)],
    define: {
      'process.env.GROQ_API_KEY': JSON.stringify(env.GROQ_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.ANTHROPIC_API_KEY': JSON.stringify(env.ANTHROPIC_API_KEY || env.CLAUDE_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    optimizeDeps: {
      include: ['mermaid'],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
