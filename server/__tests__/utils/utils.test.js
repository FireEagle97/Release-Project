const {getRandomNumber, getRandomAddressCityPair, 
    getRandomDate, getRandomPrice} = require('../../utils/utils');

beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
});

afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
});

describe('getRandomNumber', () => {
    
    test('returns a random number within the specified range', () => {

        const min = 1;
        const max = 10;
        expect(getRandomNumber(min, max)).toBe(6); 
    });
});

describe('getRandomAddressCityPair', () => {
    test('returns a random city and address pair', () => {

        const mockGetRandomNumber = jest.fn(() => 0);
  
        const result = getRandomAddressCityPair(mockGetRandomNumber);

        expect(result).toEqual({ city: 'Toronto', 
            address: '411 Castlefield Ave, Toronto, ON M5N 1L4' });
    });
});

describe('getRandomDate', () => {
    test('returns a random date between 2024-01-01 and current date', () => {
        const mockDate = new Date('2024-02-06');
        const realDateNow = Date.now.bind(global.Date);
        jest.spyOn(global.Date, 'now').mockImplementation(() => mockDate.getTime());
        const result = getRandomDate();
        global.Date.now = realDateNow;
        expect(result).toBe('2024-02-08'); 
    });
});

describe('getRandomPrice', () => {
    test('returns a random price for 1 BHK', () => {
        const result = getRandomPrice(1);
        expect(result).toBe(1150); 
    });
    test('returns a random price for 2 BHK', () => {
        const result = getRandomPrice(2);
        expect(result).toBe(2000); 
    });
    test('returns a random price for 3 BHK', () => {
        const result = getRandomPrice(3);
        expect(result).toBe(3150); 
    });
    test('returns a random price for 4 BHK', () => {
        const result = getRandomPrice(4);
        expect(result).toBe(4600); 
    });
    test('returns a random price for 5 BHK, aka null price', () => {
        const result = getRandomPrice(5);
        expect(result).toBe(null); 
    });
});