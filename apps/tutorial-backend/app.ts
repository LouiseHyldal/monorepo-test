import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import path from "path";

import { router } from "./routes/admin";
import shopRoutes from "./routes/shop";

const app = express();

app.set("view engine", "ejs");
//Default is set to /views, set it to something else if needed, this would be redundant
app.set("views", "views");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", router);
app.use(shopRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
});

app.listen(3000);
