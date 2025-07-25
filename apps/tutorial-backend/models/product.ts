import path from "path";
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
  id: string | null;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  qty?: number;
  constructor(
    id: string | null,
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
    const products = await getProductsFromFile();
    if (this.id && products) {
      const updatedProducts = this.updatedProducts(this.id, products);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        console.log(err);
      });
    } else {
      this.id = Math.random().toString();
      if (products) {
        products.push(this);

        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    }
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

  updatedProducts(id: string, products: Product[]) {
    const existingProductIndex = products.findIndex((prod) => prod.id === id);
    if (products && existingProductIndex) {
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex] = this;
      return updatedProducts;
    }
  }
}
