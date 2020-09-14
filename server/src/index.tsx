import express, { Router } from "express";
import path from "path";
import browserSync from "browser-sync";
import dotenv from "dotenv";

import web from "./routes/web";
import Appz from "../../client/src/Routes";
import cheerio from "cheerio";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

const port = 10101;
const app = express();
const router = Router();

dotenv.config();

app.set("view engine", "ejs");

app.set("views", path.resolve(__dirname, "../views"));
app.use("/js", express.static(path.resolve("public/js")));
app.use("/css", express.static(path.resolve("public/css")));
app.use("/bulma", express.static(path.resolve("node_modules/bulma")));

app.use((req, res, next) => {
  next();
});

let html = `<html><head>
<link rel="stylesheet" href="/css/styles.css" />
<link rel="stylesheet" href="/bulma/css/bulma.min.css" /></head><body><div id="root"></div><script src="/js/bundle.js"></script></body></html>`;

app.use("/", (req, res) => {
  let $ = cheerio.load(html);
  $("#root").html(
    renderToString(
      <StaticRouter location={req.url} context={{}}>
        <Appz />
      </StaticRouter>
    )
  );
  res.send($.html());
});
app.listen(port, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(path.resolve("public/js/bundle.js"));
    browserSync({
      files: [
        path.resolve("public/js/bundle.js"),
        path.resolve("public/css/style.css"),
      ],
      online: false,
      open: false,
      port: 3000,
      proxy: "localhost:" + port,
      ui: false,
    });
  } else {
    console.log(`> ready on http://localhost:${port}`);
  }
});
