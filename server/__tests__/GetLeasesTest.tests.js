const request = require('supertest');
const app = require('../api');
const DB = require('../db/db');

jest.mock('../db/db');

/**
 * Test server route endpoint
 */

describe('GET /leases/', () => {
    test('It should return all leases', async () => {
        const mockResponse = {
            'response':[
                {'_id':'65dcb853542275a4d859dd47', 'postedDate':'2022-05-18', 'bhk':2, 
                    'rentPrice':10000, 'size':1100, 'floor':'Ground out of 2', 
                    'areaType':'Super Area', 'areaLocality':'Bandel', 'city':'Kolkata',
                    'furnishing':'Unfurnished', 'preferredTentant':'Bachelors/Family', 
                    'bathroom':2, 'pointOfContact':'Contact Owner', 
                    'images':[
                        'https://azure2134398.blob.core.windows.net/test/942702830658867919.jpg', 
                        'https://azure2134398.blob.core.windows.net/test/1004083980730387790.jpg', 
                        'https://azure2134398.blob.core.windows.net/test/7.jpg', 
                        'https://azure2134398.blob.core.windows.net/test/707.jpg'
                    ]
                },
                {'_id':'65dcb853542275a4d859dd49', 'postedDate':'2022-07-03', 'bhk':2, 
                    'rentPrice':5000, 'size':800, 'floor':'Ground out of 1', 
                    'areaType':'Carpet Area', 'areaLocality':'Baruipur', 'city':'Kolkata', 
                    'furnishing':'Unfurnished', 'preferredTentant':'Bachelors/Family', 
                    'bathroom':1, 'pointOfContact':'Contact Owner', 
                    'images':[
                        'https://azure2134398.blob.core.windows.net/test/526123703573496324.jpg', 
                        'https://azure2134398.blob.core.windows.net/test/558448978082769337.jpg', 
                        'https://azure2134398.blob.core.windows.net/test/718.jpg', 
                        'https://azure2134398.blob.core.windows.net/test/717.jpg'
                    ]
                }
            ]};
        jest.spyOn(DB.prototype, 'getAllLeases').mockResolvedValue(mockResponse);
        const response = await request(app).get('/leases/');
        expect(response.body).toEqual(mockResponse);
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /leases/Toronto?furnishing=Unfurnished&minRent=1000&maxRent=2000', () => {
    test('It should return filtered leases', async () => {
        const mockResponse = {
            'response':[
                {'_id':'65dcb853542275a4d859dd47', 'postedDate':'2022-05-18', 'bhk':2, 
                    'rentPrice':10000, 'size':1100, 'floor':'Ground out of 2', 
                    'areaType':'Super Area', 'areaLocality':'Bandel', 'city':'Kolkata',
                    'furnishing':'Unfurnished', 'preferredTentant':'Bachelors/Family', 
                    'bathroom':2, 'pointOfContact':'Contact Owner', 
                    'images':[
                        'https://azure2134398.blob.core.windows.net/test/942702830658867919.jpg', 
                        'https://azure2134398.blob.core.windows.net/test/1004083980730387790.jpg', 
                        'https://azure2134398.blob.core.windows.net/test/7.jpg', 
                        'https://azure2134398.blob.core.windows.net/test/707.jpg'
                    ]
                },
                {'_id':'65dcb853542275a4d859dd49', 'postedDate':'2022-07-03', 'bhk':2, 
                    'rentPrice':5000, 'size':800, 'floor':'Ground out of 1', 
                    'areaType':'Carpet Area', 'areaLocality':'Baruipur', 'city':'Kolkata', 
                    'furnishing':'Unfurnished', 'preferredTentant':'Bachelors/Family', 
                    'bathroom':1, 'pointOfContact':'Contact Owner', 
                    'images':[
                        'https://azure2134398.blob.core.windows.net/test/526123703573496324.jpg', 
                        'https://azure2134398.blob.core.windows.net/test/558448978082769337.jpg', 
                        'https://azure2134398.blob.core.windows.net/test/718.jpg', 
                        'https://azure2134398.blob.core.windows.net/test/717.jpg'
                    ]
                }
            ]};
        jest.spyOn(DB.prototype, 'getLeasesByCityAndFilters').mockResolvedValue(mockResponse);
        const response = await request(app).
            get('/leases/Toronto?furnishing=Unfurnished&minRent=1000&maxRent=2000');
        expect(response.body).toEqual(mockResponse);
        expect(response.statusCode).toBe(200);
    });
});
