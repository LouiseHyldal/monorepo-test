import path from "path";

import express, { Request, Response, NextFunction } from "express";

import rootDir from "../util/path";
import { Product } from "./type";

export const router = express.Router();

export const products: Product[] = [];

router.get(
  "/add-product",
  (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(rootDir, "views", "add-product.html"));
  }
);

router.post("/add-product", (req: Request, res: Response) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});
