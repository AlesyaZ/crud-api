import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { env } from 'process';
import { listenerServer } from './server/server';
import { requestHandler } from './server/requestHandler';

dotenv.config();

export const server = createServer(listenerServer);
const port = env.PORT || 4000;

server.listen(port, () =>
  console.log(`The server is running on a port: ${port}`),
);
