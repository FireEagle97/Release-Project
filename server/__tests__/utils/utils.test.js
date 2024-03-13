const {getRandomNumber, getRandomAddressCityPair, getRandomDate} = require('../../utils/utils');

// beforeEach(() => {
//     jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
// });

// afterEach(() => {
//     jest.spyOn(global.Math, 'random').mockRestore();
// });

describe('getRandomNumber', () => {
    
    test('returns a random number within the specified range', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

        const min = 1;
        const max = 10;
        expect(getRandomNumber(min, max)).toBe(6); 

        jest.spyOn(global.Math, 'random').mockRestore();
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
  
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
  
        const result = getRandomDate();
  
        expect(result).toBe('2024-02-06'); 
  
        jest.restoreAllMocks();
    });
});