const request = require('supertest');
const { app } = require('../api');


// test user
const mockUser = {
    name: 'f',
    email: 'f@gmail.com',
    picture: null,
    leases: [],
};

const mockFindUser = jest.fn().mockImplementation((email) => {
    if(email !== 'f@gmail.com'){
        return null;
    }
    return Promise.resolve(mockUser);
});

const mockCreateUser = jest.fn().mockResolvedValue({}); 
jest.mock('../db/db', () => ({
    DB: jest.fn().mockImplementation(() => ({
        findUser: mockFindUser,
        createUser: mockCreateUser
    }))
}));
jest.mock('google-auth-library', () => ({
    OAuth2Client: jest.fn().mockImplementation(() => {
        return {
            verifyIdToken: jest.fn().mockImplementation(async ({ idToken }) => {
                if (idToken === 'valid_token') {
                    // Return a payload representing a valid token
                    return { 
                        getPayload: () => { 
                            return {
                                email: 'test@example.com',
                                name: 'Test User',
                                picture: 'picture.jpg',
                                save: jest.fn()
                                // Add other payload properties as needed
                            }; 
                        }
                    };
                } else {
                    // Return an error for invalid token
                    throw new Error('Invalid token');
                }
            })
        };
    })
    
}));

describe('GET /userProfile/:email & login/logout', () => {

    test('should respond with user data if user exists', async () => {
        const email = mockUser.email;
        const response = await request(app).get(`/userProfile/${email}`);

        expect(response.status).toBe(200);
        expect(response.body.response).toEqual(mockUser);
    });


    test('should respond with 404 if user does not exist', async () => {
        const email = 'nonexisting@user.com';
        const response = await request(app).get(`/userProfile/${email}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('User not found');
    });



    test('should log in successfully with valid token', async () => {
    
    
        //setting up request body with a valid token
        const token = 'valid_token';
        const requestBody = { idToken: token };
    
        //sending a POST request to the login endpoint
        const response = await request(app)
            .post('/login')
            .send(requestBody);
    
        // Verify the response
        expect(response.status).toBe(201);
    });

    test('should fail to log in with invalid token', async () => {
        const invalidToken = 'invalid_token';
        const requestBody = { idToken: invalidToken };
    
        const response = await request(app).
            post('/login').
            send(requestBody);
    
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Login failed');
    
    });
    
    

    test('should log out successfully', async () => {
        const response = await request(app).delete('/logout');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Logged out successfully');
    });

    

});