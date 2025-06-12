import path from "path";

import express, { Request, Response, NextFunction } from "express";

import { Product } from "./type";

export const router = express.Router();

export const products: Product[] = [];

router.get(
  "/add-product",
  (req: Request, res: Response, next: NextFunction) => {
    res.render("add-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
    });
  }
);

router.post("/add-product", (req: Request, res: Response) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});
