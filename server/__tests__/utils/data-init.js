const {shuffleArray, reArrangeData, readCsvFile} = require('../../utils/data-init.js');

describe('shuffleArray', () => {
    
    test('returns a shuffled array', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

        const inputArray = [1, 2, 3, 4, 5];
        const shuffledArray = shuffleArray(inputArray);
        const expectedShuffledArray = [1, 4, 2, 5, 3];
        expect(shuffledArray).toEqual(expectedShuffledArray);

        jest.spyOn(global.Math, 'random').mockRestore();
    });
});


const mockShuffleArray = jest.fn();

describe('reArrangeData', () => {
    // Test case 1: Test shuffling of interior and extras arrays
    test('shuffles interior and extras arrays', () => {
        const interior = [1, 2, 3, 4, 5];
        const extras = [6, 7, 8, 9, 10];

        reArrangeData([], interior, extras, mockShuffleArray);

        expect(mockShuffleArray).toHaveBeenCalledWith(interior);
        expect(mockShuffleArray).toHaveBeenCalledWith(extras);
    });

    // Test case 2: Test rearranging data
    test('rearranges data correctly', () => {
        const interior = ['int1', 'int2', 'int3'];
        const extras = ['ext1', 'ext2', 'ext3'];

        const data = [
            { id: 1, images: [] },
            { id: 2, images: [] },
            { id: 3, images: [] }
        ];

        mockShuffleArray.mockImplementation(array => array);

        const rearrangedData = reArrangeData(data, interior, extras, mockShuffleArray);


        expect(rearrangedData[0].images).toEqual(['int1', 'int2', 'ext1', 'ext2']);
        expect(rearrangedData[1].images).toEqual(['int3', 'int1', 'ext3', 'ext1']);
        expect(rearrangedData[2].images).toEqual(['int2', 'int3', 'ext2', 'ext3']);
    });
});


const mockGetRandomDate = jest.fn();
const mockGetRandomAddressCityPair = jest.fn();
const mockGetRandomPrice = jest.fn();

describe('readCsvFile', () => {
    
    test('should correctly read read leases', async () => {
        mockGetRandomDate.mockReturnValue('2024-01-01');
        mockGetRandomAddressCityPair.mockReturnValue({ address: 'MockAddress', city: 'MockCity' });
        mockGetRandomPrice.mockReturnValue(1000);


        const result = await readCsvFile('__tests__/utils/leases.csv', 
            mockGetRandomDate, mockGetRandomAddressCityPair, mockGetRandomPrice);
        console.log(result);
        expect(result).toEqual([
            {
                'postedDate': '2024-01-01',
                'bhk': 'value2',
                'rentPrice': 1000,
                'size': 'value4',
                'floor': 'value5',
                'address': 'MockAddress',
                'city': 'MockCity',
                'furnishing': 'value9',
                'preferredTentant': 'value10',
                'bathroom': 'value11',
                'pointOfContact': 'value12',
                'description': null,
                'images': null,
            }
        ]);
    });
});