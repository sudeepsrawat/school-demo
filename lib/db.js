import mysql from "mysql2/promise";

export async function connectDB() {
  const connection = await mysql.createConnection({
    host: "localhost", // change if using cloud db
    user: "root",      // your MySQL username
    password: "admin",
    database: "school_db"
  });
  return connection;
}
