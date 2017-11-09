import * as express from "express";

import { logger } from "./logger";
import { middlewares } from "./middlewares";

const LISTEN_PORT = 3000;

const app = express();

app.use(middlewares);

// app.get("/", (_req, res) => {
//   res.write("<!DOCTYPE html><html><head><title>My Page</title></head><body>");
//   res.write("<div id='content'>");
//   res.write(renderToString(React.createElement(App)));
//   res.write("</div></body></html>");
//   res.end();
// });

app.listen(LISTEN_PORT, "localhost", () => {
  logger.info("Listening on http://localhost:" + LISTEN_PORT);
});
