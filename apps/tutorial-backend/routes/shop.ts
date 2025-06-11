import path from "path";

import express, { Request, Response, NextFunction } from "express";

import rootDir from "../util/path";
import { products } from "../routes/admin";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log(products);
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

export default router;
