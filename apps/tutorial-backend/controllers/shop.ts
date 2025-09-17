import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import CartItem from "models/cart-item";
import Cart from "models/cart";
//import { Cart } from "../models/cart";

export function getProducts(req: Request, res: Response, next: NextFunction) {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
}

export function getProduct(req: Request, res: Response, next: NextFunction) {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product?.title,
        path: "/",
      });
    })
    .catch((err) => console.log(err));
}

export function getIndex(req: Request, res: Response, next: NextFunction) {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
}

export function getCart(req: Request, res: Response, next: NextFunction) {
  req.user
    .getCart()
    .then((cart: Cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            products: products,
            pageTitle: "Cart",
            path: "/cart",
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err: Error) => console.log(err));
}

// export function postCart(req: Request, res: Response, next: NextFunction) {
//   const prodId = req.body.productId;
//   Product.findById(prodId)
//     .then(([product]) => {
//       Cart.addProduct(prodId, product[0] ? product[0].price : 0);
//       res.redirect("/cart");
//     })
//     .catch((err) => console.log(err));
// }

// export function postCartDeleteProduct(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const prodId = req.body.productId;
//   Product.findById(prodId)
//     .then(([product]) => {
//       if (product) {
//         Cart.deleteProduct(prodId, product[0].price);
//         res.redirect("/cart");
//       }
//     })
//     .catch((err) => console.log(err));
// }

// export function getOrders(req: Request, res: Response, next: NextFunction) {
//   res.render("shop/orders", {
//     pageTitle: "Your Orders",
//     path: "/orders",
//   });
// }

// export function getCheckout(req: Request, res: Response, next: NextFunction) {
//   res.render("shop/checkout", {
//     pageTitle: "Checkout",
//     path: "/checkout",
//   });
// }
