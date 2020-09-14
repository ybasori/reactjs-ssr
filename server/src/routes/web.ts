import { Router } from "express";
import path from "path";

let html = `<html><head>
<link rel="stylesheet" href="/css/styles.css" />
<link rel="stylesheet" href="/bulma/css/bulma.min.css" /></head><body><div id="root"></div><script src="/js/bundle.js"></script></body></html>`;

type Web = (app: Router) => Router;

const web: Web = (app: Router) => {
  app.get("/", (req, res) => {
    console.log(path.resolve("client/src/Routes/"));
    return res.send(html);
  });

  app.get("/about", (req, res) => {
    return res.render("index", { title: "About" });
  });
  app.get("**", (req, res) => {
    return res.send(html);
  });

  return app;
};
export default web;
