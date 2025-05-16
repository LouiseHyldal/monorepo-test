import http, { IncomingMessage, ServerResponse } from "http";

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;

    if (url === "/") {
      res.write("<html>");
      res.write("<h1>Hello</h1>");
      res.write(
        "<form action='/create-user' method='POST'><input type='text' name='create-user'><button type='submit'>Send</button></form>"
      );
      res.write("</h1>");
      return res.end();
    }

    if (url === "/users") {
      res.write("<html>");
      res.write("<h1>Users</h1>");
      res.write("<ul><li>User 1</li></ul>");

      res.write("</h1>");
      return res.end();
    }

    if (url === "/create-user") {
      const body: any[] = [];
      req.on("data", (chunk) => {
        body.push(chunk);
      });
      req.on("end", () => {
        const username = Buffer.concat(body).toString();
        console.log(username);
      });
    }
  }
);

server.listen(3000);
