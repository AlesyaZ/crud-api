import { IncomingMessage, ServerResponse } from 'http';
import { messagesErr } from '../../core/constants';
import { errorResponse } from '../../core/response/error';
import { ResStatusCode } from '../../core/types';
import { validUserId } from '../validator/userId';

export const getUser = (res: ServerResponse, id: string) => {
  try {
    res.writeHead(ResStatusCode.OK, {
      'Content-Type': 'application/json',
    });
  } catch {
    errorResponse(
      res,
      ResStatusCode.Internal_Server_Error,
      messagesErr.Server_Error,
    );
  }
};

export const getAllUsers = (res: ServerResponse) => {
  try {
    res.writeHead(ResStatusCode.OK, {
      'Content-Type': 'application/json',
    });
  } catch {
    errorResponse(
      res,
      ResStatusCode.Internal_Server_Error,
      messagesErr.Server_Error,
    );
  }
};

export const handlerGetMethod = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const userId = req.url ? validUserId(req.url) : null;

  if (userId) {
    await getUser(res, userId);
  } else {
    await getAllUsers(res);
  }
};
