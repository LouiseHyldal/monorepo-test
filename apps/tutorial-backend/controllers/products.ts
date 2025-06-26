import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product";

export function getAddProduct(req: Request, res: Response, next: NextFunction) {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
}

export function postAddProduct(req: Request, res: Response) {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
}

export function getProducts(req: Request, res: Response, next: NextFunction) {
  Product.fetchAll((products: Product[]) => {
    res.render("shop", { prods: products, pageTitle: "Shop", path: "/" });
  });
}
