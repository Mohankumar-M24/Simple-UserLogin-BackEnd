import { getUserById, updateProfile } from "../models/userModel.js";

export const getProfile = async (req, res) => {
  const userId = req.userId;

  const user = await getUserById(userId);
  res.json({ success: true, data: user });
};

export const updateUserProfile = async (req, res) => {
  const userId = req.userId;

  const { age, dob, contact } = req.body;

  await updateProfile(userId, age, dob, contact);

  res.json({ success: true });
};
