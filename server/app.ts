import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { expensesRoute } from "./routes/expenses";
import { authRoute } from "./routes/auth"
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", logger());

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute).route("/", authRoute)

// Serve static files from the frontend/dist directory
app.use("/*", serveStatic({ root: "./frontend/dist" }));

// Fallback route for SPA
app.get("/*", async (c) => c.html(await Bun.file("./frontend/dist/index.html").text()));

// add new cors middleware
app.use("*", cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));

export default app;
export type ApiRoutes = typeof apiRoutes