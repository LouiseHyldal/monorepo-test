import express, { Request, Response, NextFunction } from "express";

const app = express();

app.use("/add-product", (req: Request, res: Response, next: NextFunction) => {
  console.log("Hello world");
  res.send("<h1>Hello from add product</h1>");
});

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("Hello world");
  res.send("<h1>Hello from Express</h1>");
});

app.listen(3000);
