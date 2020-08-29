const express = require("express");
const path = require("path");
const browserSync = require("browser-sync");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = 5000;

app.use("/", express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  if (process.env.NODE_ENV !== "production") {
    browserSync({
      files: [path.join(__dirname, "public")],
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
