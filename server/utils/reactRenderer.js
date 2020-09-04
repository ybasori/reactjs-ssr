import fs from "fs";
import path from "path";
import cheerio from "cheerio";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "../../src/App";

export default (url, cb) => {
  const context = {};
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  );
  fs.readFile(path.resolve("./public/index.html"), "utf-8", (err, data) => {
    if (err || context.url) {
      console.log(err || context.url);
      cb("Some error happened", false);
    } else {
      const $ = cheerio.load(data);
      $("#root").html(html);
      cb(null, $);
    }
  });
};
