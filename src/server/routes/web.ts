import multer from "multer";
import { Router } from "express";

import Blog from "../controllers/BlogController";
import Auth from "../controllers/AuthController";

const web = (app: Router) => {
  app.post("/login", multer().none(), Auth.authenticate);
  app.post("/signup", multer().none(), Auth.register);

  app.get("/blog", Blog.index);
  app.get("/blog/:id", Blog.show);
  app.post("/blog/create", multer().none(), Blog.store);
  app.put("/blog/:id/edit", multer().none(), Blog.update);
  app.delete("/blog/:id", multer().none(), Blog.delete);

  return app;
};

export default web;
