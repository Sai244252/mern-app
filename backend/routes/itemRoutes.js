import express from "express";

import {
  addItem,
  deleteItem,
  editItem,
  getAllItems,
  getItem,
} from "../controllers/itemController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllItems);
router.route("/:id").get(getItem);
router.route("/add-item/").post(addItem);
router.route("/edit-item/:id").put(editItem).get(getItem);
router.route("/delete-item/:id").delete(deleteItem);

export default router;
