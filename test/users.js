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
    it('responds with a JSON array of users', (done) => {
      request(app)
        .get('/api/users')
        .end(function(err, res) {
          if (err) return done(err);
          expect(res).to.be.json;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.equal(4);
          expect(res.body[0]).to.be.a('object');
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

  describe('GET /api/users/:id', () => {
    it('responds with JSON of a user', (done) => {
      request(app)
        .get('/api/users/1')
        .end(function(err, res) {
          if (err) return done(err);
          expect(res).to.be.json;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.equal(1);
          expect(res.body[0]).to.be.a('object');
          expect(res.body[0]).to.have.property('first_name');
          expect(res.body[0]['first_name']).to.equal('lionel');
          expect(res.body[0]).to.have.property('last_name');
          expect(res.body[0]['last_name']).to.equal('lints');
          done();
        });
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
          if (err) return done(err);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('github_id');
          expect(res.body['github_id']).to.equal('506571');
          expect(res.body).to.have.property('last_name');
          expect(res.body['last_name']).to.equal('lastTest');
          done();
        })
    });
  });

  describe('PUT /api/users/:id', () => {
    it('responds with user id and updated JSON columns', (done) => {
      request(app)
        .put('/api/users/1')
        .send({ 
           first_name:"newTestUser",
           last_name:"PUTlastTest",
           github_id:"33506571",
           avatar_url:"https://avatars.githubusercontent.com/u/335067571?v=3",
           email:"newguy.someone@example.com"
         })
        .end(function(err, res) {
          if (err) return done(err);
          expect(res).to.be.json;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.equal(1);
          expect(res.body[0]).to.be.a('object');
          expect(res.body[0]).to.have.property('id');
          expect(res.body[0]['id']).to.equal(1);
          expect(res.body[0]).to.have.property('first_name');
          expect(res.body[0]['first_name']).to.equal('newTestUser');
          expect(res.body[0]).to.have.property('last_name');
          expect(res.body[0]['last_name']).to.equal('PUTlastTest');
          done();
        });
    });

    it('does not allow update of ID', (done) => {
      request(app)        
        .put('/api/users/2')
        .send({ 
          id: 11,
          first_name:"newTestUser",
          last_name:"PUTlastTest",
          github_id:"33506571",
          avatar_url:"https://avatars.githubusercontent.com/u/335067571?v=3",
          email:"newguy.someone@example.com"
         })
        .end(function(err, res) {
          expect(res.status).to.equal(422);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body['error']).to.equal('You cannot update the id field.');
          if (err) return done(err);
          done();      
        });
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('deletes the specified user, and returns 204(success, no content)', (done) => {
      request(app)
        .delete('/api/users/1')
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.status).to.equal(204);
          request(app)
            .get('/api/users')
            .end(function(err, res) {
              if (err) return done(err);
              expect(res).to.be.json;
              expect(res.status).to.equal(200);
              expect(res.body).to.be.a('array');
              expect(res.body.length).to.equal(3);
              expect(res.body[0]).to.be.a('object');
              expect(res.body[0]).to.have.property('first_name');
              expect(res.body[0]['first_name']).to.equal('cj');
              expect(res.body[0]).to.have.property('last_name');
              expect(res.body[0]['last_name']).to.equal('reynolds');
              expect(res.body[2]).to.have.property('first_name');
              expect(res.body[2]['first_name']).to.equal('adam');
              expect(res.body[2]).to.have.property('last_name');
              expect(res.body[2]['last_name']).to.equal('lichty');
              done();
            });
        });
    });
  });
});
