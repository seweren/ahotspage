import * as express from "express";
import * as process from "process";
import { middlewares } from "./middlewares";

const logger = new console.Console(process.stdout);

const app = express();

app.use(middlewares);

const server = app.listen(3000, "localhost", () => {
  logger.info("Listening on http://localhost:" + server.address().port);
});
