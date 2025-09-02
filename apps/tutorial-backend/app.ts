import express from "express";
import bodyParser from "body-parser";
import path from "path";

import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import { get404 } from "./controllers/error";
import sequelize from "./util/database";

const app = express();

app.set("view engine", "ejs");
//Default is set to /views, set it to something else if needed, this would be redundant
app.set("views", "views");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

sequelize
  .sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => console.log(err));

app.listen(3000);
