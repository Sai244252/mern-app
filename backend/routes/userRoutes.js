import express from "express";

import {
  createUser,
  getAllUsers,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";

import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/create-user/").post(createUser).get(authenticate, getAllUsers);

router.post("/auth/", loginUser);
router.post("/logout/", logoutUser);
router.get("/get-users/", getAllUsers);

export default router;
