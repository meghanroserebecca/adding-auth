const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;

const app = require('../../lib/app');
const mongoose = require('mongoose');

const connection = require('../../lib/connection');

describe.only('auth', () => {
    before(() => mongoose.connection.dropDatabase());

    const user = {
        username: 'user',
        password: 'password'
    };

    const request = chai.request(app);

    describe('user management', () => {

        const badRequest = (url, data, error) =>
            request
                .post(url)
                .send(data)
                .then(
                    () => {throw new Error('status should not be okay');},
                    res => {
                        assert.equal(res.status, 400);
                        assert.equal(res.response.body.error, error);
                    }
                );
        it('signup requires username', () =>
            badRequest('/auth/signup', { password: 'password'}, 'username and password must be supplied')
        );

        it('signup requires password', () =>
            badRequest('/auth/signup', {username: 'user'}, 'username and password must be supplied')
        );

        let token = '';

        it('signup', () =>
            request
                .post('/auth/signup')
                .send(user)
                .then(res => assert.ok(token = res.body.token))
        );

        it('can\'t use same username', () =>
            badRequest('/auth/signup', user, `username ${user.username} already exists`)
        );

        it('signin requires username', () =>
            badRequest('/auth/signin', { password: 'password'}, 'username and password must be supplied')
        );

        it('signin requires password', () =>
            badRequest('/auth/signin', { username: 'user' }, 'username and password must be supplied')
        );

        it('signin with wrong user fails', () =>
            badRequest('/auth/signin', { username: 'notuser', password: user.password }, 'invalid username or password')
        );

        it('signin with wrong password fails', () =>
            badRequest('/auth/signin', { username: user.username, password: 'fake'}, 'invalid username or password')
        );

        it('signin', () =>
            request
                .post('/auth/signin')
                .send(user)
                .then(res => assert.ok(res.body.token))
        );

        it('token is invalid', () =>
            request
                .get('auth/verify')
                .set('Authorization', 'bad token')
                .then(
                    () => {throw new Error('success response not expected');},
                    (res) => { assert.equal(res.status, 401 );}
                )
        );

        it('token is valid', () =>
            request
                .get('/auth/verify')
                .set('Authorization', token)
                .then(res => assert.ok(res.body))
        );
    });

    describe('unauthorized', () => {

        it('401 with no token', () => {
            return request
                .get('/burn')
                .then(
                    () => { throw new Error('status should not be 200');},
                    res => {
                        assert.equal(res.status, 401);
                        assert.equal(res.response.body.error, 'Unauthorized');
                    }
                );
        });

        it('401 with invalid token', () => {
            return request
                .get('/burn')
                .set('Authorization', 'badtoken')
                .then(
                    () => { throw new Error('status should not be 200');},
                    res => {
                        assert.equal(res.status, 401);
                        assert.equal(res.response.body.error, 'Unauthorized');
                    }
                );
        })
    });
});