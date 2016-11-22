import request from 'supertest';
import { expect } from 'chai';
import app from '../src/index';
import knex from '../src/db';
import env from 'dotenv';

env.config({NODE_ENV: 'test'});

describe('GET /api/users', () => {
  it('responds with JSON', done => {
    request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

xdescribe('GET /api/users/:id', () => {
  it('responds with JSON of a user', done => {
    
  });
});

xdescribe('POST /api/users', () => {
});

xdescribe('PUT /api/users/:id', () => {
});

xdescribe('DELETE /api/users/:id', () => {
});
