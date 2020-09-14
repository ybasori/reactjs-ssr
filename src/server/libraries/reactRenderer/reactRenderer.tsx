import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import cheerio from "cheerio";
import path from "path";
import fs from "fs";

import Common from "../../../common";

const reactRenderer = (url: string) => {
  let html = fs.readFileSync(path.resolve("index.html"));

  let $ = cheerio.load(html);

  $("#root").html(
    ReactDOMServer.renderToString(
      <StaticRouter location={url} context={{}}>
        <Common />
      </StaticRouter>
    )
  );

  return $;
};

export default reactRenderer;
