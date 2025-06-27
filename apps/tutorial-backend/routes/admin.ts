import express from "express";

import { getAddProduct, getProducts, postAddProduct } from "../controllers/admin";

const router = express.Router();

router.get("/add-product", getAddProduct);

router.get("/products", getProducts);

router.post("/add-product", postAddProduct);

export default router;
