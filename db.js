import mysql from "mysql2/promise";

export const db = await mysql.createPool({
  
  host: "localhost",
  user: "root",
  password: "Mohan@54321",
  database: "internship_app"
});
