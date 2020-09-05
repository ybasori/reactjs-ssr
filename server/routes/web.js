import Blog from "../controllers/BlogController";
const web = (app) => {
  app.get("/blog", Blog.index);
  app.get("/blog/:id", Blog.show);
  app.post("/blog", Blog.store);
  app.put("/blog/:id", Blog.update);
  app.delete("/blog/:id", Blog.delete);
  return app;
};

export default web;
