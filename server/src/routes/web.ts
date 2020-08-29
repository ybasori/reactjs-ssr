import { Router } from "express";

type Web = (app: Router) => Router;

const web: Web = (app: Router) => {
  app.get("/", (req, res) => {
    return res.render("index", { title: "Home" });
  });

  app.get("/about", (req, res) => {
    return res.render("index", { title: "About" });
  });
  app.get("**", (req, res) => {
    return res.render("index");
  });

  return app;
};
export default web;
