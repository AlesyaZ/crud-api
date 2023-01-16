import { IncomingMessage, ServerResponse } from 'http';
import { messagesErr } from '../core/constants';
import { User } from '../core/models';
import { errorResponse } from '../core/response/error';
import { ResStatusCode } from '../core/types';

export function getUserData(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<User> {
  return new Promise((resolve) => {
    let userData = '';

    req.on('data', (data) => {
      userData += data.toString();
    });

    req.on('end', () => {
      try {
        const userParse = JSON.parse(userData);
        resolve(userParse);
      } catch {
        errorResponse(res, ResStatusCode.Bad_Request, messagesErr.User_Error);
      }
    });
  });
}
