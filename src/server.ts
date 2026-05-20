import index from "./index.html";

const port = 3000;

const server = Bun.serve({
  port,
  routes: {
    "/": index,
  },
  development: {
    hmr: true,
    console: true,
  },
});

console.info(`Draw A Card For Life is running at ${server.url}`);
