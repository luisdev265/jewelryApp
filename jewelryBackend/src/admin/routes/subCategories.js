import getAllController from "../controllers/subCategories/getAll.js";
import express from "express";

const router = express.Router();

router.get("/", getAllController);

export default router;