const request = require('supertest')
const { connect } = require('./database')
const app = require('../app');
const moment = require('moment');
const PostModel = require('../models/postModel');
const UserModel = require('../models/userModel')


describe('Post Route', () => {

    beforeAll(async () => {

        await UserModel.findOne({ email: 'tobis@gmail.com', password: '123456'});

        const loginResponse = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ 
            email: 'tobis@gmail.com', 
            password: '123456'
        });

        token = loginResponse.body.token;
    })

    // afterEach(async () => {
    //     await conn.cleanup()
    // })

    // afterAll(async () => {
    //     await conn.disconnect()
    // })

    it('should return Posts', async () => {
        // create order in our db
        const response = await request(app)
        .get('/posts')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('Posts')
        expect(response.body).toHaveProperty('status', true)
    })

    it('should return Posts with state 2', async () => {
        // create Post in our db
        const response = await request(app)
        .get('/posts')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('posts')
        expect(response.body).toHaveProperty('status', true)
    })
});
