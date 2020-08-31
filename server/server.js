import express from "express";
import path from "path";
import browserSync from "browser-sync";
import dotenv from "dotenv";
import fs from "fs";

import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";

dotenv.config();
const app = express();
const port = 5000;

app.use("/js", express.static(path.join(__dirname, "../public/js")));
app.use("/css", express.static(path.join(__dirname, "../public/css")));

app.get("**", (req, res) => {
  const html = ReactDOMServer.renderToString(<App />);
  fs.readFile(path.resolve("./public/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }
    return res.send(
      data.replace(`<div id="root"></div>`, `<div id="root">${html}</div>`)
    );
  });
});

app.listen(port, () => {
  if (process.env.NODE_ENV !== "production") {
    browserSync({
      files: [path.join(__dirname, "../public")],
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
