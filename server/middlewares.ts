import { RequestHandler } from "express";
import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import * as webpack from "webpack";
import * as WebpackDevMiddleware from "webpack-dev-middleware";
import * as WebpackHotMiddleware from "webpack-hot-middleware";
import { clientWebpackConfig } from "../client/client.webpack";

const compiler = webpack(clientWebpackConfig);

export const middlewares: RequestHandler[] = [
  morgan("combined"),
  WebpackDevMiddleware(compiler,
    {
      publicPath: clientWebpackConfig.output.publicPath,
      stats: { colors: true },
    }),
  WebpackHotMiddleware(compiler, {
    log: console.log,
  }),
  express.static(path.join(__dirname, "..", "client")),
];
