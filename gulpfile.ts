import { ChildProcess, spawn } from "child_process";
import * as gulp from "gulp";
import * as tslint from "gulp-tslint";
import webdriver = require("gulp-webdriver");
import { join } from "path";
import selenium = require("selenium-standalone");
import * as webpack from "webpack";
import * as webpackStream from "webpack-stream";

import { getClientWebpackDevConfig } from "./client.webpack.dev";
import { getClientWebpackProdConfig } from "./client.webpack.prod";
import { serverWebpackDevConfig } from "./server.webpack.dev";
import { serverWebpackProdConfig } from "./server.webpack.prod";

const production: boolean = process.env.NODE_ENV === "production";
let serverPid: ChildProcess = null;

function stopServer() {
  if (serverPid) {
    serverPid.kill();
    serverPid = null;
  }
}

function stopSeleniumServer() {
  if (selenium.child) {
    (selenium.child as ChildProcess).kill();
    selenium.child = null;
  }
}

gulp.task("compile-server", () => {
  const serverWebpackConfig = production ? serverWebpackProdConfig : serverWebpackDevConfig;
  return webpackStream(serverWebpackConfig, webpack)
    .pipe(gulp.dest(serverWebpackConfig.output.path));
});

gulp.task("compile-client", () => {
  const clientWebpackConfig = production ? getClientWebpackProdConfig(".") : getClientWebpackDevConfig(".");
  return webpackStream(clientWebpackConfig, webpack)
    .pipe(gulp.dest(clientWebpackConfig.output.path));
});

gulp.task("start-server", (done) => {
  serverPid = spawn("node", ["server/server.js"]);
  done();
});

gulp.task("start-selenium-server", (done) => {
  selenium.install({}, (installError: any) => {
    if (installError) {
      stopServer();
      return done(installError);
    }
    selenium.start((startError: any, child: ChildProcess) => {
      if (startError) {
        stopServer();
        return done(startError);
      }
      selenium.child = child;
      done();
    });
  });
});

gulp.task("stop-server", (done) => {
  stopServer();
  done();
});

gulp.task("stop-selenium-server", (done) => {
  stopSeleniumServer();
  done();
});

gulp.task("stop-servers", gulp.parallel("stop-server", "stop-selenium-server"));

gulp.task("start-servers", gulp.parallel("start-server", "start-selenium-server"));

gulp.task("run-selenium-tests-webdriver", (done) =>
  gulp.src(join("tests", "wdio.conf.js")).pipe(webdriver())
    .once("error", () => {
      stopServer();
      stopSeleniumServer();
      done("selenium tests are failed");
    }),
);

gulp.task("run-selenium-tests",
  gulp.series(
    "stop-servers",
    "start-servers",
    "run-selenium-tests-webdriver",
    "stop-servers",
  ),
);

gulp.task("compile-all", gulp.parallel("compile-client", "compile-server"));

const tslintFolder = (folder: string) =>
  gulp.src(`${folder}/**/*.ts?(x)`)
    .pipe(tslint.default({ formatter: "verbose" }))
    .pipe(tslint.default.report());

const tslintClient = () => tslintFolder("client");
const tslintServer = () => tslintFolder("server");
const tslintTests = () => tslintFolder("tests");

gulp.task("tslint-all", gulp.parallel(tslintClient, tslintServer, tslintTests));

gulp.task("default", gulp.series("compile-all"));
