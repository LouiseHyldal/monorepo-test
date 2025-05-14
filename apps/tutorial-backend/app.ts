import http, { IncomingMessage, ServerResponse } from "http";

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log(req);
  }
);

server.listen(3000);
