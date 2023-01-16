import { ServerResponse } from 'http';

export const errorResponse = (
  res: ServerResponse,
  statusCode: number,
  massegeError: string,
) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
  });
  res.end(
    JSON.stringify({
      code: statusCode,
      message: massegeError,
    }),
  );
};
