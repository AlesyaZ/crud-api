import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { env } from 'process';
import { requestHandler } from './server/requestHandler';

dotenv.config();

export const server = createServer(requestHandler);
const port = env.PORT || 4000;

server.listen(port, () =>
  console.log(`The server is running on a port: ${port}`),
);
