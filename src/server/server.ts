import cluster from 'cluster';
import { IncomingMessage, ServerResponse } from 'http';
import { userData } from '../core/constants';
import { User } from '../core/models';
import { requestHandler } from './requestHandler';

export const listenerServer = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  res.setHeader('Content-Type', 'application/json');

  if (cluster.isWorker) {
    if (process.send) {
      process.send({ action: 'get' });
    }

    process.once('message', async (user) => {
      const usersData = await requestHandler(req, res, user as User[]);
      if (process.send) {
        process.send({ action: 'send', usersData });
      }
    });
  } else {
    await requestHandler(req, res, userData);
  }
};
