import { server } from '../src';
import { User } from '../src/core/models';
import supertest from 'supertest';
import { ResStatusCode } from '../src/core/types';

const user: User = {
  username: 'Ivan',
  age: 35,
  hobbies: ['Sport'],
};

const apiUrl = '/api/users';

let newUser: User;

describe('1 scenario', () => {
  it('should return an empty array, GET api/users request', async () => {
    const res = await supertest(server).get(apiUrl);
    expect(res.statusCode).toBe(ResStatusCode.OK);
    expect(res.body).toEqual([]);
  });

  it('should return a response containing newly created record, POST /api/users request', async () => {
    const res = await supertest(server).post(apiUrl).send(user);
    expect(res.statusCode).toBe(ResStatusCode.Created);
    expect(res.body).toEqual({ ...user, id: res.body.id });
    newUser = res.body;
  });

  it('should return the created record by its id, GET', async () => {
    const res = await supertest(server).get(`${apiUrl}/${newUser.id}`);
    expect(res.statusCode).toBe(ResStatusCode.OK);
    expect(res.body).toEqual(newUser);
  });

  it('should return successful deletion', async () => {
    const res = await supertest(server).delete(`${apiUrl}/${newUser.id}`);
    expect(res.statusCode).toBe(ResStatusCode.No_Content);
  });
});

describe('2 scenario', () => {
  it('should create new user, POST', async () => {
    const res = await supertest(server).post(apiUrl).send(user);
    expect(res.statusCode).toBe(ResStatusCode.Created);
    expect(res.body).toEqual({ ...user, id: res.body.id });
    newUser.id = res.body.id;
  });

  it('should return successful deletion', async () => {
    const res = await supertest(server).delete(`${apiUrl}/${newUser.id}`);
    expect(res.statusCode).toBe(ResStatusCode.No_Content);
  });

  it('should return 404, GET method', async () => {
    const response = await supertest(server).get(`${apiUrl}/${newUser.id}`);
    expect(response.statusCode).toBe(ResStatusCode.Not_Found);
  });

  it('should return 400, POST method', async () => {
    const response = await supertest(server).post(`${apiUrl}`);
    expect(response.statusCode).toBe(ResStatusCode.Bad_Request);
  });

  it('should return 404, PUT method', async () => {
    const response = await supertest(server)
      .put(`${apiUrl}/${newUser.id}`)
      .send({ username: '123' });
    expect(response.statusCode).toBe(ResStatusCode.Not_Found);
  });

  it('should return 404, DELETE method', async () => {
    const response = await supertest(server).delete(`/api/users/${newUser.id}`);
    expect(response.statusCode).toBe(ResStatusCode.Not_Found);
  });
});

describe('3 Scenario', () => {
  it('should create new user, POST', async () => {
    const res = await supertest(server).post(apiUrl).send(user);
    expect(res.statusCode).toBe(ResStatusCode.Created);
    expect(res.body).toEqual({ ...user, id: res.body.id });
    newUser.id = res.body.id;
  });

  it('should return 400, POST method', async () => {
    const response = await supertest(server).post(`${apiUrl}`);
    expect(response.statusCode).toBe(ResStatusCode.Bad_Request);
  });

  it('should return 400, POST method without username', async () => {
    delete newUser['username'];
    const res = await supertest(server)
      .post(`${apiUrl}`)
      .send(newUser['username']);
    expect(res.statusCode).toBe(ResStatusCode.Bad_Request);
  });

  it('should return user, GET method', async () => {
    const response = await supertest(server).get(`${apiUrl}/${newUser.id}`);
    expect(response.statusCode).toBe(ResStatusCode.OK);
  });

  it('should return successful deletion', async () => {
    const res = await supertest(server).delete(`${apiUrl}/${newUser.id}`);
    expect(res.statusCode).toBe(ResStatusCode.No_Content);
  });
  server.close();
});
