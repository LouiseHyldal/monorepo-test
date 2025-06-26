import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import path from "path";

import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import { get404 } from "./controllers/error";

const app = express();

app.set("view engine", "ejs");
//Default is set to /views, set it to something else if needed, this would be redundant
app.set("views", "views");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

app.listen(3000);
