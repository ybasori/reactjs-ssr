import express from "express";
import path from "path";
import browserSync from "browser-sync";
import dotenv from "dotenv";

import reactRenderer from "./libraries/reactRenderer";
import web from "./routes/web";
import pretty from "./libraries/pretty";
import csrf from "csurf";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = 5000;
const csrfProtection = csrf({ cookie: true });

app.use(cookieParser());

// from dist
app.use("/js/bundle.js", express.static(path.resolve("dist/bundle.js")));
app.use("/css/styles.css", express.static(path.resolve("dist/styles.css")));

// from node_modules
app.use("/bulma", express.static(path.resolve("node_modules/bulma/css")));
app.use(
  "/fontawesome",
  express.static(path.resolve("node_modules/@fortawesome/fontawesome-free"))
);

// from assets
app.use("/assets", express.static(path.resolve("assets")));

app.use("/", web(express.Router()));

app.get("**", csrfProtection, (req, res) => {
  const $ = reactRenderer(req.url, req.csrfToken());
  res.send(pretty($.html()));
});

app.listen(port, () => {
  if (process.env.NODE_ENV !== "production") {
    browserSync({
      files: [path.resolve("assets"), path.resolve("dist/bundle.js")],
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
