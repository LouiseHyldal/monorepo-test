import path from "path";

import express, { Request, Response, NextFunction } from "express";

import rootDir from "../util/path";


const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

export default router;
