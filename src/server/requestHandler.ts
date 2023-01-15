import { IncomingMessage, ServerResponse } from 'http';
import { ResStatusCode } from '../core/types';

export const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        break;
      case 'POST':
        break;
      case 'PUT':
        break;
      case 'DELETE':
        break;
      default:
    }
  } catch {}
  res.writeHead(200);
  res.end(`Server OK!`);
};
