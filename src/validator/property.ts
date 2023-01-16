import { ServerResponse } from 'http';
import { messagesErr } from '../core/constants';
import { User } from '../core/models';
import { errorResponse } from '../core/response/error';
import { ResStatusCode } from '../core/types';

export function validProperty(res: ServerResponse, user: User) {
  try {
    if (
      typeof user.username !== 'string' ||
      !Array.isArray(user.hobbies) ||
      typeof user.age !== 'number' ||
      (user.hobbies.length > 0 &&
        !user.hobbies.some((elem) => typeof elem === 'string'))
    ) {
      errorResponse(res, ResStatusCode.Bad_Request, messagesErr.Fields_Error);
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
