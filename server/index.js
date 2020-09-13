import express from "express";
import path from "path";
import browserSync from "browser-sync";
import dotenv from "dotenv";

import reactRenderer from "./utils/reactRenderer";
import web from "./routes/web";
import pretty from "./libraries/pretty";

dotenv.config();
const app = express();
const port = 5000;

app.use("/assets", express.static(path.join(__dirname, "../public/assets")));
app.use("/js", express.static(path.join(__dirname, "../public/js")));
app.use("/css", express.static(path.join(__dirname, "../public/css")));
app.use(
  "/bulma",
  express.static(path.join(__dirname, "../node_modules/bulma/css"))
);
app.use(
  "/fontawesome",
  express.static(
    path.join(__dirname, "../node_modules/@fortawesome/fontawesome-free")
  )
);

app.use((req, res, next) => {
  reactRenderer(req.url, (err, html) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    req.html = html;
    next();
  });
});

app.use("/", web(express.Router()));

app.get("**", (req, res) => {
  const $ = req.html;
  res.send(pretty($.html()));
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
