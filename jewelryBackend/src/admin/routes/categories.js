import selectAllController from "../controllers/categories/selectALL.js";
import express from "express";

const router = express.Router();

router.get("/", selectAllController);

export default router;