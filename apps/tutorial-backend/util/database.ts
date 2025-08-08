import mysql from "mysql2";
import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.WSL_IP,
  user: "wsl_root",
  database: "node-course",
  password: process.env.DB_PASSWORD,
});

export default pool.promise();
