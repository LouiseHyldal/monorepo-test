import Express, { Request, Response, NextFunction } from "express";

const app = Express();

// app.use("/test-test", (req: Request, res: Response, next: NextFunction) => {
//   console.log("Hello test test");
//   res.send("<h1>Hello from test test</h1>");
// });

// app.use("/test", (req: Request, res: Response, next: NextFunction) => {
//   console.log("Hello test");
// });

// app.use("/", (req: Request, res: Response, next: NextFunction) => {
//   console.log("Hello world");
// });

app.use("/users", (req: Request, res: Response, next: NextFunction) => {
  res.send("<h1>Users</h1>");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.send("<h1>Homepage</h1>");
});

app.listen(3000);
