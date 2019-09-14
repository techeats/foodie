import request from "supertest";
import app from "../src/www";


const incomingUserData = {
    token: 'xxxxxfffffvvvbbb',
    name: 'express',
    email: 'express',
    password: 'express'
  }

   describe('Register Endpoints', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/v1/user/register')
        .send({incomingUserData})
      expect(res.status).toEqual(201)
      expect(res.body).toHaveProperty('post')
    })
  })