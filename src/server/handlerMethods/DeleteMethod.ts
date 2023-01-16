import { IncomingMessage, ServerResponse } from 'http';
import { messagesErr, userData } from '../../core/constants';
import { errorResponse } from '../../core/response/error';
import { methodResponse } from '../../core/response/method';
import { ResStatusCode } from '../../core/types';
import { findUserId, validId } from '../../validator/userId';

const deleteUserId = (id: string) => {
  const userId = userData.findIndex((user) => user.id === id);
  const [UserId] = userData.splice(userId, 1);
  return UserId;
};

export const removeUser = (res: ServerResponse, id: string) => {
  try {
    const resultId = validId(res, id);
    if (resultId) {
      const deleteUser = deleteUserId(id);
      methodResponse(res, ResStatusCode.No_Content, deleteUser);
    }
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
  const userId = req.url ? findUserId(req.url) : null;

  if (userId) {
    removeUser(res, userId);
  } else {
    errorResponse(res, ResStatusCode.Not_Found, messagesErr.Endpoint_Error);
  }
};
