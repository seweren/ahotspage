import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";

const logger = new console.Console(process.stdout);

const app = express();

app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "..", "client")));

const server = app.listen(8000, "localhost", () => {
  logger.info("Listening on http://localhost:" + server.address().port);
});
