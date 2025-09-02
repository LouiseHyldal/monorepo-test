import "dotenv/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "node-course",
  "wsl_root",
  process.env.DB_PASSWORD,
  { dialect: "mysql", host: process.env.WSL_IP }
);

export default sequelize;
