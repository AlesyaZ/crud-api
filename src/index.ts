import * as dotenv from 'dotenv';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { env } from 'process';

dotenv.config();

const sendResponse = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200);
  res.end(`Server OK!`);
};

const server = createServer(sendResponse);
const port = env.PORT || 4000;

server.listen(port, () =>
  console.log(`The server is running on a port: ${port}`),
);
