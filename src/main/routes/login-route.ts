import { Router } from "express";
import { adaptRouter } from "../adapters/express/express-router-adapter";

export default (router: Router): void => {
  router.post("/login", adaptRouter());
};
