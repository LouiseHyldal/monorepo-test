import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import path from "path";

import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import { get404 } from "./controllers/error";
import sequelize from "./util/database";
import Product from "./models/product";
import User from "./models/user";
import Cart from "./models/cart";
import CartItem from "./models/cart-item";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
export {};

const app = express();

app.set("view engine", "ejs");
//Default is set to /views, set it to something else if needed, this would be redundant
app.set("views", "views");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use((req: Request, res: Response, next: NextFunction) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Louise", email: "test@test.com" });
    }
    return Promise.resolve(user);
  })
  .then((user) => {
    return user.createCart();
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
