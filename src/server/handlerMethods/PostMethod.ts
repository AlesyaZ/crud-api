import { IncomingMessage, ServerResponse } from 'http';
import { messagesErr } from '../../core/constants';
import { ResStatusCode } from '../../core/types';
import { validUserId } from '../validator/userId';

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    res.writeHead(ResStatusCode.Created, {
      'Content-Type': 'application/json',
    });
  } catch {
    res.writeHead(ResStatusCode.Internal_Server_Error, {
      'Content-Type': 'application/json',
    });
    res.end(
      JSON.stringify({
        code: ResStatusCode.Internal_Server_Error,
        message: messagesErr.Server_Error,
      }),
    );
  }
};

export const handlerPostMethod = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const userId = req.url ? validUserId(req.url) : null;

  if (userId) {
    res.writeHead(ResStatusCode.Not_Found, {
      'Content-Type': 'application/json',
    });
    res.end(
      JSON.stringify({
        code: ResStatusCode.Not_Found,
        message: messagesErr.Endpoint_Error,
      }),
    );
  } else {
    createUser(req, res);
  }
};
