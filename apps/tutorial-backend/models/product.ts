import Sequelize, { Model } from "sequelize";
import sequelize from "../util/database";

interface ProductType extends Model {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
};

const Product = sequelize.define<ProductType>("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Product;
