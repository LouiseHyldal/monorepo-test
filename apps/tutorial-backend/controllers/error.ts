import { Request, Response, NextFunction } from "express";

export function get404(req: Request, res: Response) {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
}
