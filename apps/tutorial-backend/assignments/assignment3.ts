import express, { Request, Response } from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/users", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "views", "users.html"));
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "views", "homepage.html"));
});

app.listen(3000);
