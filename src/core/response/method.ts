import { ServerResponse } from 'http';

export const methodResponse = <U>(
  res: ServerResponse,
  statusCode: number,
  body: U,
) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(body));
};
