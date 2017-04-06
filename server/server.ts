import * as express from "express";

const logger = new console.Console(process.stdout);

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello from Express");
});

const server = app.listen(8000, "localhost", () => {
  logger.info("Listening on http://localhost:" + server.address().port);
});
