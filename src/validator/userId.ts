import { ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';
import { messagesErr, userData } from '../core/constants';
import { errorResponse } from '../core/response/error';
import { ResStatusCode } from '../core/types';

export const findUserId = (url: string) => {
  const userID = url.replace('/api/users', '');
  if (userID.length > 1) {
    return userID.slice(1);
  } else {
    return null;
  }
};

export function validId(res: ServerResponse, id: string) {
  try {
    if (!uuidValidate(id)) {
      errorResponse(res, ResStatusCode.Bad_Request, messagesErr.Uuid_Error);
      return false;
    }
    if (!userData.find((user) => user.id === id)) {
      errorResponse(res, ResStatusCode.Not_Found, messagesErr.UserId_Error);
      return false;
    }
  } catch {
    errorResponse(
      res,
      ResStatusCode.Internal_Server_Error,
      messagesErr.Server_Error,
    );
    return false;
  }
  return true;
}
