import express from "express";
import path from "path";
import cluster from "cluster";
import os from "os";

import reactRenderer from "../common/_utils/reactRenderer";
import web from "./routes/web";
import pretty from "../common/_utils/pretty";
import csrf from "csurf";
import cookieParser from "cookie-parser";

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  const port = Number(process.env.PORT || 5000);
  const csrfProtection = csrf({ cookie: true });

  app.use(cookieParser());
  app.use(csrfProtection);

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
    console.log(`> ready on http://localhost:${port}`);
  });
}

cluster.on("exit", (worker) => {
  console.log(`${worker.id} removed`);
  cluster.fork();
});
