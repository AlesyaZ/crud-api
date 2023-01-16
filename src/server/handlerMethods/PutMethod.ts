import { IncomingMessage, ServerResponse } from 'http';
import { messagesErr } from '../../core/constants';
import { errorResponse } from '../../core/response/error';
import { ResStatusCode } from '../../core/types';
import { validUserId } from '../validator/userId';

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  try {
    res.writeHead(ResStatusCode.OK, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(updateUser));
  } catch {
    errorResponse(
      res,
      ResStatusCode.Internal_Server_Error,
      messagesErr.Server_Error,
    );
  }
};

export const handlerPutMethod = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const userId = req.url ? validUserId(req.url) : null;

  if (userId) {
    updateUser(req, res, userId);
  } else {
    errorResponse(res, ResStatusCode.Not_Found, messagesErr.Endpoint_Error);
  }
};
