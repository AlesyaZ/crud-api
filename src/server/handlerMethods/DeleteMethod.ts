import { IncomingMessage, ServerResponse } from 'http';
import { messagesErr } from '../../core/constants';
import { errorResponse } from '../../core/response/error';
import { ResStatusCode } from '../../core/types';
import { validUserId } from '../validator/userId';

export const removeUser = (res: ServerResponse, id: string) => {
  try {
    res.writeHead(ResStatusCode.No_Content, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(removeUser));
  } catch {
    errorResponse(
      res,
      ResStatusCode.Internal_Server_Error,
      messagesErr.Server_Error,
    );
  }
};

export const handlerDeleteMethod = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const userId = req.url ? validUserId(req.url) : null;

  if (userId) {
    removeUser(res, userId);
  } else {
    errorResponse(res, ResStatusCode.Not_Found, messagesErr.Endpoint_Error);
  }
};
