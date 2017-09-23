import * as express from "express";
import * as morgan from "morgan";
import { join } from "path";
import * as webpack from "webpack";
import * as WebpackDevMiddleware from "webpack-dev-middleware";
import * as WebpackHotMiddleware from "webpack-hot-middleware";

import { getClientWebpackDevConfig } from "./../client.webpack.dev";
import { getClientWebpackProdConfig } from "./../client.webpack.prod";

const pathToClientWebpackTS = join(__dirname, "..");
const clientWebpackDevConfig = getClientWebpackDevConfig(pathToClientWebpackTS);
const clientWebpackProdConfig = getClientWebpackProdConfig(pathToClientWebpackTS);
const compiler = webpack(clientWebpackDevConfig);

const commonMiddleWares: express.RequestHandler[] =
  [
    morgan("combined"),
  ];

export const middlewares: express.RequestHandler[] =
  (process.env.NODE_ENV === "production") ?
    [
      ...commonMiddleWares,
      ...[
        express.static(`./${pathToClientWebpackTS}${clientWebpackProdConfig.output.path}`),
      ],
    ] :
    [
      ...commonMiddleWares,
      ...[
        WebpackDevMiddleware(compiler,
          {
            publicPath: clientWebpackDevConfig.output.publicPath,
            stats: { colors: true },
          }),
        WebpackHotMiddleware(compiler, {
          log: console.log,
        }),
        express.static(`./${pathToClientWebpackTS}${clientWebpackDevConfig.output.path}`),
      ],
    ];
