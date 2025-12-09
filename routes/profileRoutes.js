import express from "express";
import { getProfile, updateUserProfile } from "../controllers/profileController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", auth, getProfile);
router.put("/", auth, updateUserProfile);
export default router;
