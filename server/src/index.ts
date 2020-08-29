import express, { Router } from "express";
import path from "path";
import browserSync from "browser-sync";
import dotenv from "dotenv";

import web from "./routes/web";

const port = 10101;
const app = express();
const router = Router();

dotenv.config();

app.set("view engine", "ejs");

app.set("views", path.resolve(__dirname, "../views"));
app.use("/js", express.static(path.resolve(__dirname, "../../public/js")));
app.use("/css", express.static(path.resolve(__dirname, "../../public/css")));
app.use(
  "/bulma",
  express.static(path.resolve(__dirname, "../../node_modules/bulma"))
);

app.use("/", web(router));

app.listen(port, () => {
  if (process.env.NODE_ENV !== "production") {
    browserSync({
      files: [
        path.join(__dirname, "../../public/js/bundle.js"),
        path.join(__dirname, "../../public/css/styles.css"),
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
