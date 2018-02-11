import { ChildProcess, spawn } from "child_process";
import * as gulp from "gulp";
import * as mocha from "gulp-mocha";
import { join } from "path";
import * as webpack from "webpack";
import * as webpackStream from "webpack-stream";

import { getClientWebpackDevConfig } from "./client.webpack.dev";
import { getClientWebpackProdConfig } from "./client.webpack.prod";
import { serverWebpackDevConfig } from "./server.webpack.dev";
import { serverWebpackProdConfig } from "./server.webpack.prod";
import { testsWebpackSeleniumConfig } from "./tests.webpack.selenium";
import { testsWebpackUnitConfig } from "./tests.webpack.unit";

function getSelenium() {
  return require("selenium-standalone");
}
function getWebdriver() {
  return require("gulp-webdriver");
}
const selenium = getSelenium();
const webdriver = getWebdriver();
const production: boolean = process.env.NODE_ENV === "production";
let serverPid: ChildProcess = null;

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

gulp.task("compile-unit-tests", () =>
  webpackStream(testsWebpackUnitConfig, webpack)
    .pipe(gulp.dest(testsWebpackUnitConfig.output.path)),
);

gulp.task("compile-selenium-tests", () =>
  webpackStream(testsWebpackSeleniumConfig, webpack)
    .pipe(gulp.dest(testsWebpackSeleniumConfig.output.path)),
);

gulp.task("run-unit-tests", () =>
  gulp.src(join(testsWebpackUnitConfig.output.path, testsWebpackUnitConfig.output.filename), { read: false })
    .pipe(mocha({ reporter: "dot" })),
);

gulp.task("start-server", done => {
  serverPid = spawn("node", ["server/server.js"]);
  done();
});

gulp.task("start-selenium-server", (done) => {
  selenium.install({}, (installError: any) => {
    if (installError) {
      return done(installError);
    }
    selenium.start((startError: any, child: any) => {
      if (startError) {
        return done(startError);
      }
      selenium.child = child;
      done();
    });
  });
});

gulp.task("stop-server", done => {
  if (serverPid) {
    serverPid.kill();
    serverPid = null;
  }
  done();
});

gulp.task("stop-selenium-server", done => {
  if (selenium.child) {
    selenium.child.kill();
    selenium.child = null;
  }
  done();
});

gulp.task("stop-servers", gulp.series("stop-server", "stop-selenium-server"));

gulp.task("start-servers", gulp.series("start-server", "start-selenium-server"));

gulp.task("run-selenium-tests-webdriver", done =>
  gulp.src(join("tests", "wdio.conf.js")).pipe(webdriver())
    .once("error", () => { selenium.child.kill(); done(); })
);

gulp.task("run-selenium-tests",
  gulp.series(
    "stop-servers",
    "start-servers",
    "run-selenium-tests-webdriver",
    "stop-servers",
  )
);

gulp.task("compile-run-selenium-tests", gulp.series("compile-selenium-tests", "run-selenium-tests"));

gulp.task("compile-run-unit-tests", gulp.series("compile-unit-tests", "run-unit-tests"));

gulp.task("run-tests", gulp.series("compile-run-unit-tests", "compile-run-selenium-tests"));

gulp.task("compile-all", gulp.series("compile-client", "compile-server"));

gulp.task("default", gulp.series("compile-all"));
