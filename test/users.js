import request from 'supertest';
import { expect } from 'chai';
import db from '../src/db';
import app from '../src/index';

describe('user api routes', () => {
  beforeEach((done) => {
    db((knex) => {
      return knex.migrate.rollback({ directory: '../db/migrations' })
        .then(() => {
          return knex.migrate.latest({ directory: '../db/migrations' })
            .then(() => {
              return knex.seed.run({ directory: '../db/seeds' })
                .then(() => {
                  done();
                });
            });
        });
    });
  });

  afterEach((done) => {
    db((knex) => { 
      return knex.migrate.rollback({ directory: '../db/migrations' })
        .then(() => {
          done();
        });
    });
  });

  describe('GET /api/users', () => {
    it('responds with JSON', (done) => {
      request(app)
        .get('/api/users')
        .end(function(err, res) {
          if (err) return done(err);
          expect(res).to.be.json;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.equal(4);
          expect(res.body[0]).to.have.property('first_name');
          expect(res.body[0]['first_name']).to.equal('lionel');
          expect(res.body[0]).to.have.property('last_name');
          expect(res.body[0]['last_name']).to.equal('lints');
          expect(res.body[3]).to.have.property('first_name');
          expect(res.body[3]['first_name']).to.equal('adam');
          expect(res.body[3]).to.have.property('last_name');
          expect(res.body[3]['last_name']).to.equal('lichty');
          done();
        });
    });
  });

  xdescribe('GET /api/users/:id', () => {
    it('responds with JSON of a user', (done) => {

    });
  });

  describe('POST /api/users', () => {
    it('creates a new user', (done) => {
      request(app)
        .post('/api/users')
        .send({ 
          first_name:"testUser",
          last_name:"lastTest",
          github_id:"506571",
          avatar_url:"https://avatars.githubusercontent.com/u/5067571?v=3",
          email:"adam.someone@example.com"
        })
        .expect(201)
        .end(function(err, res) {
          if (err) {
            throw err;
          } else {
            done();
          }
        })
    });
  });


  xdescribe('PUT /api/users/:id', () => {
  });

  xdescribe('DELETE /api/users/:id', () => {
  });
});


