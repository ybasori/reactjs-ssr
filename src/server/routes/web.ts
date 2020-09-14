import multer from "multer";
import { Router } from "express";
import csrf from "csurf";

import Blog from "../controllers/BlogController";
import Auth from "../controllers/AuthController";

const csrfProtection = csrf({ cookie: true });

const web = (app: Router) => {
  app.post("/login", csrfProtection, multer().none(), Auth.authenticate);
  app.post("/signup", csrfProtection, multer().none(), Auth.register);

  app.get("/blog", csrfProtection, Blog.index);
  app.get("/blog/:id", csrfProtection, Blog.show);
  app.post("/blog/create", csrfProtection, multer().none(), Blog.store);
  app.put("/blog/:id/edit", csrfProtection, multer().none(), Blog.update);
  app.delete("/blog/:id", csrfProtection, multer().none(), Blog.delete);

  return app;
};

export default web;
