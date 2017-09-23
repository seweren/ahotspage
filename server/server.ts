import * as express from "express";

import { logger } from "./logger";
import { middlewares } from "./middlewares";

const LISTEN_PORT = 3000;

const app = express();

app.use(middlewares);

app.listen(LISTEN_PORT, "localhost", () => {
  logger.info("Listening on http://localhost:" + LISTEN_PORT);
});
