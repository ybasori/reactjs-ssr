const express = require("express");
const browserSync = require("browser-sync");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  if (process.env.NODE_ENV !== "production") {
    browserSync({
      online: false,
      open: false,
      port: 3000,
      proxy: "localhost:" + port,
      ui: false,
    });
  } else {
    console.log(`> server running on http://localhost:${port}`);
  }
});
