import { Request, Response, NextFunction } from "express";
import Product from "../models/product";

export function getAddProduct(req: Request, res: Response, next: NextFunction) {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
}

export function postAddProduct(req: Request, res: Response) {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
      userId: req.user.id,
    })
    .then(() => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch();
}

export function getEditProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
}

export function postEditProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { productId, title, imageUrl, description, price } = req.body;
  Product.findByPk(productId)
    .then((product) => {
      if (product) {
        console.log("product found");
        product.title = title;
        product.imageUrl = imageUrl;
        product.description = description;
        product.price = price;
        return product.save();
      }
    })
    .then(() => {
      console.log("Product updated");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
}

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
}

export function postDeleteProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (product) {
        return product.destroy();
      }
    })
    .then((result) => {
      console.log("Destroyed product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
}
