import { db } from "../db.js";

export const createUser = async (name, email, hash) => {
  const [rows] = await db.query(
    "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
    [name, email, hash]
  );
  return rows;
};

export const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?", [email] );
  return rows[0];
};

export const updateProfile = async (id, age, dob, contact) => {
  await db.query(
    "UPDATE users SET age=?, dob=?, contact=? WHERE id=?", [age, dob, contact, id]);
};

export const getUserById = async (id) => {
  const [rows] = await db.query(
    "SELECT name, email, age, dob, contact FROM users WHERE id = ?", [id]);
  return rows[0];
};
