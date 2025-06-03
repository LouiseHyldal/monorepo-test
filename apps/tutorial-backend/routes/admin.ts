import path from "path";

import express, { Request, Response, NextFunction } from "express";

import rootDir from "../util/path";

const router = express.Router();

router.get(
  "/add-product",
  (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(rootDir, "views", "add-product.html"));
  }
);

router.post("/add-product", (req: Request, res: Response) => {
  console.log(req.body);
  res.redirect("/");
});

export default router;
