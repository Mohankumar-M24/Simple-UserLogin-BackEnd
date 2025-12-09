import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../models/userModel.js";
import { redisClient } from "../redis.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await findUserByEmail(email);
  if (user) return res.json({ success: false, message: "Email already exists" });

  const hash = await bcrypt.hash(password, 10);
  await createUser(name, email, hash);

  res.json({ success: true });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.json({ success: false, message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.json({ success: false, message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

  await redisClient.set(`session:${token}`, user.id, { EX: 86400 });

  res.json({ success: true, token });
};

export const logout = async (req, res) => {
  const { token } = req.body;
  await redisClient.del(`session:${token}`);
  res.json({ success: true });
};
