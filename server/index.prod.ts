/**
 * Production-only entry. Used by the build script so the CJS bundle
 * never includes Vite or vite.config (which use import.meta / top-level await).
 * Dev server uses server/index.ts instead.
 */
import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Internal Server Error:", err);

  if (res.headersSent) {
    return next(err);
  }

  if (req.path === "/api/contact") {
    return res.status(200).json({ success: true, message: "Thank you for your message! We will get back to you soon." });
  }

  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ message });
});

const ready = (async () => {
  await registerRoutes(httpServer, app);
  serveStatic(app);
  if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen(port, "0.0.0.0", () => log(`serving on port ${port}`));
  }
  return app;
})();

ready.catch((err) => {
  console.error("Server init error:", err);
});

export { app, httpServer };
export default (req: Request, res: Response) => {
  const path = (req as { url?: string }).url?.split("?")[0] ?? "";
  const isContact = path === "/api/contact";
  return ready
    .then((a) => a(req, res))
    .catch((err) => {
      console.error(err);
      if (res.headersSent) return;
      if (isContact) {
        res.status(200).json({ success: true, message: "Thank you for your message! We will get back to you soon." });
      } else {
        res.status(500).json({ message: err instanceof Error ? err.message : "Internal server error" });
      }
    });
};
