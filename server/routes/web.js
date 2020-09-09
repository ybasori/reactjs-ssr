import multer from "multer";

import Blog from "../controllers/BlogController";
import Auth from "../controllers/AuthController";

const web = (app) => {
  app.post("/login", multer().none(), Auth.authenticate);

  app.get("/blog", Blog.index);
  app.get("/blog/:id", Blog.show);
  app.post("/blog/create", multer().none(), Blog.store);
  app.put("/blog/:id/edit", multer().none(), Blog.update);
  app.delete("/blog/:id", multer().none(), Blog.delete);

  return app;
};

export default web;
