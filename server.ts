import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory history for demo purposes
  const history: any[] = [];

  // API routes
  app.get("/api/history", (req, res) => {
    res.json(history);
  });

  app.post("/api/history", (req, res) => {
    const item = {
      ...req.body,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    history.push(item);
    // Keep only last 10
    if (history.length > 10) history.shift();
    res.status(201).json(item);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    app.get("*", async (req, res) => {
      try {
        const fs = await import("fs/promises");
        const indexHtml = await fs.readFile(path.join(distPath, "index.html"), "utf-8");
        
        // Inject the API key into the window object so the client can access it even if not baked in
        const injectedHtml = indexHtml.replace(
          "<head>",
          `<head><script>window.process = { env: { GEMINI_API_KEY: ${JSON.stringify(process.env.GEMINI_API_KEY || process.env.API_KEY)} } };</script>`
        );
        res.send(injectedHtml);
      } catch (e) {
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
