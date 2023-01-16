import { IncomingMessage, ServerResponse } from 'http';
import { messagesErr, userData } from '../../core/constants';
import { User } from '../../core/models';
import { errorResponse } from '../../core/response/error';
import { methodResponse } from '../../core/response/method';
import { ResStatusCode } from '../../core/types';
import { getUserData } from '../../shared/getUserData';
import { validProperty } from '../../validator/property';
import { findUserId, validId } from '../../validator/userId';

const putUser = (id: string, user: User) => {
  const userId = userData.findIndex((user) => user.id === id);
  userData[userId] = { id, ...user };
  return userData[userId];
};

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  try {
    const resultId = validId(res, id);
    if (resultId) {
      const userData = await getUserData(req, res);
      const userProp = validProperty(res, userData);
      if (userProp) {
        const updateUser = putUser(id, userData);
        methodResponse(res, ResStatusCode.OK, updateUser);
      }
    }
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
  const userId = req.url ? findUserId(req.url) : null;

  if (userId) {
    updateUser(req, res, userId);
  } else {
    errorResponse(res, ResStatusCode.Not_Found, messagesErr.Endpoint_Error);
  }
};
