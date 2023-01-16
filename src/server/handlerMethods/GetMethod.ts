import { IncomingMessage, ServerResponse } from 'http';
import { messagesErr, userData } from '../../core/constants';
import { errorResponse } from '../../core/response/error';
import { methodResponse } from '../../core/response/method';
import { ResStatusCode } from '../../core/types';
import { findUserId, validId } from '../../validator/userId';

const foundUser = (id: string) => {
  const userId = userData.find((user) => user.id === id);
  return userId;
};

export const getUser = (res: ServerResponse, id: string) => {
  try {
    const userId = validId(res, id);
    if (userId) {
      const user = foundUser(id);
      methodResponse(res, ResStatusCode.OK, user);
    }
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
    methodResponse(res, ResStatusCode.OK, userData);
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
  const userId = req.url ? findUserId(req.url) : null;

  if (userId) {
    await getUser(res, userId);
  } else {
    await getAllUsers(res);
  }
};
