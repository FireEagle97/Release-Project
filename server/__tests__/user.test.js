const request = require('supertest');
const { app } = require('../api');
// const { DB } = require('../db/db');

// test user
const testUserData = {
    '_id': '123',
    'name': 'Test User',
    'email': 'test@user.com',
    'picture': 'picture_url',
    'leases': [
        {
            'postedDate': '2024-04-01',
            'bhk': 2,
            'rentPrice': 1500,
            'size': 1340,
            'floor': '3',
            'address': '345 Rue Drolet, Montreal, QC H2S 2S4, Canada',
            'city': 'Montreal',
            'furnishing': 'Semi-Furnished',
            'preferredTentant': 'Family',
            'bathroom': 0,
            'pointOfContact': 'Contact 514 999 8888',
            'description': 'description',
            'images': [
                'img_url',
                'img_url'
            ],
            '_id': '123',
            '__v': 0
        }
    ]
};
jest.mock('../db/db', () => ({
    DB: jest.fn().mockImplementation(() => ({
        findUser: jest.fn().mockImplementation((email) => {
            if (email === testUserData.email) {
                return Promise.resolve(testUserData);
            } else {
                return Promise.resolve(null);
            }
        })
    }))
}));

describe('GET /userProfile/:email', () => {
    test('should respond with user data if user exists', async () => {
        const email = testUserData.email;
        const response = await request(app).get(`/userProfile/${email}`);

        expect(response.status).toBe(200);
        expect(response.body.response).toEqual(testUserData);
    });

    test('should respond with 404 if user does not exist', async () => {
        const email = 'test@user.com';
        const response = await request(app).get(`/userProfile/${email}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('User not found');
    });


});