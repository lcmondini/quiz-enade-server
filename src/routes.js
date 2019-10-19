import { Router } from "express";

const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({ messages: "Hello World!" });
});

export default routes;
