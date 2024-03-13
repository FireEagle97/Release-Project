const {getRandomNumber} = require('../../utils/utils');

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