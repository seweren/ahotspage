import * as express from "express";
import * as morgan from "morgan";
import { join } from "path";
import * as webpack from "webpack";
import * as WebpackDevMiddleware from "webpack-dev-middleware";
import * as WebpackHotMiddleware from "webpack-hot-middleware";
import { getClientWebpackConfig } from "./../client.webpack";

const pathToClientWebpackTS = join(__dirname, "..");
const clientWebpackConfig = getClientWebpackConfig(pathToClientWebpackTS);
const compiler = webpack(clientWebpackConfig);

export const middlewares: express.RequestHandler[] =
  process.env.NODE_ENV === "production" ?
    [
      morgan("combined"),
      express.static(`./${pathToClientWebpackTS}${clientWebpackConfig.output.path}`),
    ] :
    [
      morgan("combined"),
      WebpackDevMiddleware(compiler,
        {
          publicPath: clientWebpackConfig.output.publicPath,
          stats: { colors: true },
        }),
      WebpackHotMiddleware(compiler, {
        log: console.log,
      }),
      express.static(`./${pathToClientWebpackTS}${clientWebpackConfig.output.path}`),
    ];
