import path, { resolve } from "path";
import fs from "fs";

const p = path.join(
  path.dirname(require.main?.filename ?? ""),
  "data",
  "products.json"
);

function readFilePromis() {
  return new Promise<Product[] | undefined>((resolve, reject) => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        reject(undefined);
      } else {
        resolve(JSON.parse(fileContent.toString()));
      }
    });
  });
}

function getProductsFromFile() {
  return readFilePromis();
}
export type ProductType = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  qty?: number;
};
export class Product {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  qty?: number;
  constructor(
    id: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number,
    qty?: number
  ) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.qty = qty;
  }

  async save() {
    this.id = Math.random().toString();
    getProductsFromFile();
  }

  static async fetchAll() {
    return getProductsFromFile();
  }

  static async findById(id: string) {
    const products = await getProductsFromFile();
    if (products) {
      return products.find((p) => p.id === id);
    }
  }
}
