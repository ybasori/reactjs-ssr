import multer from "multer";

import Blog from "../controllers/BlogController";
const web = (app) => {
  app.get("/blog", Blog.index);
  app.get("/blog/:id", Blog.show);
  app.post("/blog", multer().none(), Blog.store);
  app.put("/blog/:id", multer().none(), Blog.update);
  app.delete("/blog/:id", multer().none(), Blog.delete);
  return app;
};

export default web;
