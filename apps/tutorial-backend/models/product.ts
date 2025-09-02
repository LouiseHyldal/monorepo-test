import database from "../util/database";
import { Cart } from "./cart";
import mysql, { RowDataPacket } from "mysql2";

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

  save() {
    return database.execute(
      "INSERT INTO products (title, price, imageUrl, description) VALUE (?, ?, ?, ?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static delete(id: string) {}

  static fetchAll() {
    return database.execute<RowDataPacket[]>("SELECT * FROM products");
  }

  static findById(id: string) {
    return database.execute<RowDataPacket[]>("SELECT * FROM products WHERE products.id = ?", [id]);
  }
}
