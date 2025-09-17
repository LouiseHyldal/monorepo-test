import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../util/database";

class CartItem extends Model<
  InferAttributes<CartItem>,
  InferCreationAttributes<CartItem>
> {
  declare id: CreationOptional<number>;
  declare quantity: number;
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
  },
  { tableName: "cartitems", sequelize }
);

export default CartItem;
