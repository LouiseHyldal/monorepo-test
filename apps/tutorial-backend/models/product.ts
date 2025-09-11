import Sequelize, { DataTypes, Model } from "sequelize";
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
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Product;
