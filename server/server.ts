import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import * as process from "process";
import * as webpack from "webpack";
import * as WebpackDevMiddleware from "webpack-dev-middleware";
import * as WebpackHotMiddleware from "webpack-hot-middleware";
import { clientWebpackConfig } from "../client/client.webpack";

const logger = new console.Console(process.stdout);

const app = express();

const compiler = webpack(clientWebpackConfig);

app.use(morgan("combined"));
app.use(
  WebpackDevMiddleware(compiler,
    {
      publicPath: clientWebpackConfig.output.publicPath,
      stats: { colors: true },
    }),
);
app.use(
  WebpackHotMiddleware(compiler, {
    log: console.log,
  }),
);
app.use(express.static(path.join(__dirname, "..", "client")));

const server = app.listen(3000, "localhost", () => {
  logger.info("Listening on http://localhost:" + server.address().port);
});
