import cluster from 'cluster';
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { env } from 'process';
import { cpus } from 'os';
import { requestHandler } from './server/requestHandler';
import { saveUsers, userData } from './core/constants';
import { listenerServer } from './server/server';

dotenv.config();

const server = createServer(listenerServer);
const port = env.PORT || 4000;

const updateUser = { users: [...userData] };

if (cluster.isPrimary) {
  server.listen(port, () =>
    console.log(`The server is running on a port: ${port}`),
  );

  for (let i = 1; i <= cpus().length; i++) {
    cluster.fork({ PORT: Number(port) + i });
  }

  cluster.on('message', (worker, user) => {
    if (user.action === 'send') {
      updateUser.users = user.usersData;
      saveUsers(updateUser.users);
    }
    if (user.action === 'get') {
      updateUser.users = userData;
      worker.send(updateUser.users);
    }
  });
} else {
  server.listen(port, () =>
    console.log(`The worker is running on a port: ${port}`),
  );
}
