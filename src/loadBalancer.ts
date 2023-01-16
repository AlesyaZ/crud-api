import cluster from 'cluster';
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { env } from 'process';
import { cpus } from 'os';
import { requestHandler } from './server/requestHandler';

dotenv.config();

const server = createServer(requestHandler);
const port = env.PORT || 4000;

if (cluster.isPrimary) {
  server.listen(port, () =>
    console.log(`The server is running on a port: ${port}`),
  );

  for (let i = 1; i <= cpus().length; i++) {
    cluster.fork({ PORT: Number(port) + i });
  }
} else {
  server.listen(port, () =>
    console.log(`The worker is running on a port: ${port}`),
  );
}
