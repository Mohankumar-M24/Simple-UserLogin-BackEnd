import { redisClient } from "../redis.js";

export const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({ success: false, message: "Token missing" });
  }

  const userId = await redisClient.get(`session:${token}`);
  if (!userId) {
    return res.json({ success: false, message: "Session expired" });
  }

  req.userId = userId;
  next();
};
