import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import path from "path";

import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";

const app = express();

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
