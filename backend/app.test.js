
const request = require('supertest');
const app = require('./app');

describe('POST /users/signup', () => {
    it('should authenticate a user', async () => {
        const data = {
            username: 'mohamed',
            password: 'mohamed',
            mail: 'Kesroui@gmail.com',
            phoneNumber: '056853329'
        };

        const response = await request(app)
            .post('/bars/users/signup')
            .send(data)
            .expect(200);
        console.log(response.status, response.body);

        if (response.body.result) {
            expect(response.body.result).toBe(true);
        } else {
            expect(response.body.result).toBe(false);
            expect(response.body.error).toBe('User already exists');
        }
    });
});