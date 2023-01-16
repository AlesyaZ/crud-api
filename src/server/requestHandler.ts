import { IncomingMessage, ServerResponse } from 'http';
import { ResStatusCode } from '../core/types';
import { messagesErr } from '../core/constants';
import { handlerGetMethod } from './handlerMethods/GetMethod';
import { handlerPostMethod } from './handlerMethods/PostMethod';
import { handlerPutMethod } from './handlerMethods/PutMethod';
import { handlerDeleteMethod } from './handlerMethods/DeleteMethod';
import { errorResponse } from '../core/response/error';

export const requestHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const { url, method } = req;
    const userURL = /\/api\/users/.test(url);
    if (url && !url.startsWith('/api/users') && !userURL) {
      errorResponse(res, ResStatusCode.Not_Found, messagesErr.Endpoint_Error);
      return;
    }

    switch (method) {
      case 'GET':
        await handlerGetMethod(req, res);
        break;
      case 'POST':
        await handlerPostMethod(req, res);
        break;
      case 'PUT':
        await handlerPutMethod(req, res);
        break;
      case 'DELETE':
        await handlerDeleteMethod(req, res);
        break;
      default:
        errorResponse(
          res,
          ResStatusCode.Bad_Request,
          messagesErr.Implemented_Error,
        );
    }
  } catch {
    errorResponse(
      res,
      ResStatusCode.Internal_Server_Error,
      messagesErr.Server_Error,
    );
  }
};
