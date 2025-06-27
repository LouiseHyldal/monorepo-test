import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product";

export function getProducts(req: Request, res: Response, next: NextFunction) {
  Product.fetchAll((products: Product[]) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
}

export function getIndex(req: Request, res: Response, next: NextFunction) {
  Product.fetchAll((products: Product[]) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
}

export function getCart(req: Request, res: Response, next: NextFunction) {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
  });
}

export function getOrders(req: Request, res: Response, next: NextFunction) {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
}

export function getCheckout(req: Request, res: Response, next: NextFunction) {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
}
