import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { authIsAdmin } from "../middlewares/isadmin.middleware.js";
import {
  CreateNewItemData,
  deleteItemData,
  getAllItem,
  getallItemById,
  updateItemData,
} from "../controllers/items.controller.js";

const router = express.Router();

router.route("/").get(getAllItem).post(CreateNewItemData);

router
  .route("/:id")
  .get(getallItemById)
  .put(updateItemData)
  .delete(deleteItemData);

export default router;
