import fastify from "fastify";

const app = fastify();

app.get("/hello", async () => {
  return { hello: "world" };
});

app.listen({ port: 3333, host: "0.0.0.0" }, () => {
  console.log("HTTP server running on http://0.0.0.0:3333");
});
