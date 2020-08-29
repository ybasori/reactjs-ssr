const express = require("express");
const path = require("path");
const browserSync = require("browser-sync");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = 5000;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use("/", express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  if (process.env.NODE_ENV !== "production") {
    browserSync({
      files: [path.join(__dirname, "public/js/bundle.js")],
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
