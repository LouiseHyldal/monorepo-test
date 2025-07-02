import fs from "fs";
import path from "path";
import { Product } from "./product";

const p = path.join(
  path.dirname(require.main?.filename ?? ""),
  "data",
  "cart.json"
);

export class Cart {
  static addProduct(id: string, productPrice: number) {
    fs.readFile(p, (err, fileContent) => {
      let cart: {
        products: Array<{
          id: string;
          qty: number;
        }>;
        totalPrice: number;
      } = {
        products: [],
        totalPrice: 0,
      };
      if (!err) {
        cart = JSON.parse(fileContent.toString());
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
}
