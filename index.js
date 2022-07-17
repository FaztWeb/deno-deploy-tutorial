import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";

const app = new Application();
const tasks = [];

const tasksRoutes = new Router()
  .get("/", (ctx) => {
    ctx.response.body = "Welcome to my API";
  })
  .get("/tasks", (ctx) => {
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.body = tasks;
  })
  .post("/tasks", async (ctx) => {
    const newTask = await ctx.request.body().value;
    tasks.push(newTask);
    ctx.response.body = newTask;
  });

app.use(tasksRoutes.routes());
app.use(tasksRoutes.allowedMethods());

console.log("Server running on port 8000");
await app.listen({ port: 8000 });
