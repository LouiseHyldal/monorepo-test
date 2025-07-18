import express from "express";

import { getAddProduct, getEditProduct, getProducts, postAddProduct } from "../controllers/admin";

const router = express.Router();

router.get("/add-product", getAddProduct);

router.get("/products", getProducts);

router.post("/add-product", postAddProduct);

router.get("/edit-product/:productId", getEditProduct);

router.post("/edit-product", getEditProduct);

export default router;
