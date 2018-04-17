import express = require('express');
import supertest = require('supertest');

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { expect } from 'chai';

import { AppModule } from '../../app.module';
import { setupNestApplication } from '../../setup';
import { DatabaseModule, DatabaseService } from '../database';
import { UserModule } from './user.module';
import { UserService } from './user.service';

describe('UserController', () => {
  const expressServer = express();
  const server: supertest.SuperTest<any> = supertest(expressServer);

  let app: INestApplication;
  let userService: UserService;
  let databaseService: DatabaseService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        AppModule
      ]
    }).compile();

    app = await module.createNestApplication(expressServer);
    databaseService = app.select(DatabaseModule).get(DatabaseService);
    userService = app.select(UserModule).get(UserService);

    setupNestApplication(app);
    await app.init();
    await databaseService.reset();
    await databaseService.seed();
  });

  afterAll(async () => {
    await databaseService.disconnect();
  });

  describe('login', async () => {
    it('should not login user with non existent email', async () => {
      const data = {
        email: `non-existent@test.com`,
        password: `test`
      };
      const response = await server
        .post('/api/users/login')
        .send(data)
        .expect(401);
      expect(response.body).to.be.an('object');
    });
    it('should not login user with invalid password', async () => {
      const data = {
        email: `admin@test.com`,
        password: `invalidpassword`
      };
      const response = await server
        .post('/api/users/login')
        .send(data)
        .expect(401);
      expect(response.body).to.be.an('object');
    });
    it('should login user with valid credentials', async () => {
      const data = {
        email: `admin@test.com`,
        password: `test`
      };
      const response = await server
        .post('/api/users/login')
        .send(data)
        .expect(201);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('user');
      expect(response.body).to.have.property('token');
    });
  });

  describe('getMe', async () => {
    it('should return current user', async () => {
      const data = await userService.login({
        email: `admin@test.com`,
        password: `test`
      });
      const response = await server
        .get('/api/users/me')
        .set('x-access-token', data.token)
        .expect(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('id', data.user.id);
    });
  });

  describe('getUsers', async () => {
    it('should return 200 /api/users', () => {
      return server
        .get('/api/users')
        .expect(200);
    });
  });
});
