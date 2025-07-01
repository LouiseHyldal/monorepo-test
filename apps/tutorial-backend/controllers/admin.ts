import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product";

export function getAddProduct(req: Request, res: Response, next: NextFunction) {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
}

export function postAddProduct(req: Request, res: Response) {
  const id = req.body.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(id, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
}

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const products = await Product.fetchAll();

  res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
}
