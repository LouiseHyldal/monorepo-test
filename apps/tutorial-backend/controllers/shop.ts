import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product";
import { Cart } from "../models/cart";

export function getProducts(req: Request, res: Response, next: NextFunction) {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
}

export function getProduct(req: Request, res: Response, next: NextFunction) {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product[0].title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
}

export function getIndex(req: Request, res: Response, next: NextFunction) {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
}

export function getCart(req: Request, res: Response, next: NextFunction) {
  Cart.getCart(async (cart: any) => {
    Product.fetchAll()
      .then(([rows, fieldData]) => {
        if (rows) {
          const cartProducts = [];
          for (const product of rows) {
            const cartProductData = cart.products.find(
              (p: Product) => p.id === product.id
            );
            if (cartProductData) {
              cartProducts.push({
                productData: product,
                qty: cartProductData.qty,
              });
            }
          }
          res.render("shop/cart", {
            pageTitle: "Your Cart",
            path: "/cart",
            products: cartProducts,
          });
        }
      })
      .catch((err) => console.log(err));
  });
}

export function postCart(req: Request, res: Response, next: NextFunction) {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(([product]) => {
      Cart.addProduct(prodId, product[0] ? product[0].price : 0);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
}

export function postCartDeleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(([product]) => {
      if (product) {
        Cart.deleteProduct(prodId, product[0].price);
        res.redirect("/cart");
      }
    })
    .catch((err) => console.log(err));
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
