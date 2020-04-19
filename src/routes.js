import { Router } from "express";
import spotify from "./middlewares/spotify";

const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello teste" });
});

routes.post("/spotify", spotify.search);

export default routes;
