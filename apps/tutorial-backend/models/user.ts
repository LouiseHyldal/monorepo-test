import Sequelize, {
  CreationOptional,
  DataTypes,
  HasOneCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../util/database";
import Cart from "./cart";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;

  declare createCart : HasOneCreateAssociationMixin<Cart>
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
  },
  { tableName: "users", sequelize }
);

export default User;
