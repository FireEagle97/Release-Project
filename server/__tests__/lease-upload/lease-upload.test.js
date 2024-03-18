const request = require('supertest');
const {app} = require('../../api');

jest.mock('../../db/db', () => ({
    DB: jest.fn().mockImplementation(() => ({
        createManyLeases: jest.fn()
    }))
}));

jest.mock('../../routes/utils/image-upload', () => ({
    getImageUrls: jest.fn().mockResolvedValue(['mock-url-1', 'mock-url-2'])
}));

describe('POST /leaseUpload/', () => {
    test('should return status 200 and upload property data', async () => {
        const property = {
            rentPrice: 1000,
            bhk: 3,
            floor: 2,
            address: 'Mock Address',
            contactInfo: '123-456-7890',
            size: 100,
            bedrooms: 3,
            bathrooms: 2,
            floorNumber: 2,
            furnishing: 'Furnished'
        };
        const response = await request(app).
            post('/leaseUpload').
            send(property);
            
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ 'respose': 'ok' });
    });
});
