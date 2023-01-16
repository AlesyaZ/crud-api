import { IncomingMessage, ServerResponse } from 'http';
import { ResStatusCode } from '../../core/types';
import { validUserId } from '../validator/userId';

export const getUser = (res: ServerResponse, id: string) => {
  try {
    res.writeHead(ResStatusCode.OK, {
      'Content-Type': 'application/json',
    });
  } catch {
    res.writeHead(ResStatusCode.Internal_Server_Error, {
      'Content-Type': 'application/json',
    });
  }
};

export const getAllUsers = (res: ServerResponse) => {
  try {
    res.writeHead(ResStatusCode.OK, {
      'Content-Type': 'application/json',
    });
  } catch {
    res.writeHead(ResStatusCode.Internal_Server_Error, {
      'Content-Type': 'application/json',
    });
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
