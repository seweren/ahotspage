import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import * as process from "process";
import * as webpack from "webpack";
import * as WDS from "webpack-dev-server";
import { clientWebpackConfig } from "../client/client.webpack";

new WDS(webpack(clientWebpackConfig), {
  historyApiFallback: true,
  hot: true,
  publicPath: clientWebpackConfig.output.publicPath,
}).listen(6000, "localhost", (err: any) => {
  if (err) {
    return logger.info(err);
  }
  logger.info("Listening at http://localhost:6000/");
});

const logger = new console.Console(process.stdout);

const app = express();

app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "..", "client")));

const server = app.listen(3000, "localhost", () => {
  logger.info("Listening on http://localhost:" + server.address().port);
});
