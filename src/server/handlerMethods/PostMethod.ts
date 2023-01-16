import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { messagesErr, userData } from '../../core/constants';
import { errorResponse } from '../../core/response/error';
import { methodResponse } from '../../core/response/method';
import { ResStatusCode } from '../../core/types';
import { getUserData } from '../../shared/getUserData';
import { validProperty } from '../../validator/property';
import { validUserId } from '../../validator/userId';
import { User } from '../../core/models';

const addUser = (user: User) => {
  const userCreate = { id: uuidv4(), ...user };
  userData.push(userCreate);
  return userCreate;
};

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const userData = await getUserData(req, res);
    const userProp = validProperty(res, userData);
    if (userProp) {
      const user = addUser(userData);
      methodResponse(res, ResStatusCode.Created, user);
    }
  } catch {
    errorResponse(
      res,
      ResStatusCode.Internal_Server_Error,
      messagesErr.Server_Error,
    );
  }
};

export const handlerPostMethod = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const userId = req.url ? validUserId(req.url) : null;

  if (userId) {
    errorResponse(res, ResStatusCode.Not_Found, messagesErr.Endpoint_Error);
  } else {
    createUser(req, res);
  }
};
