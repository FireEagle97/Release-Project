const {shuffleArray, reArrangeData} = require('../../utils/data-init.js');

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
        console.log(rearrangedData);
        // Check if the images are properly rearranged
        expect(rearrangedData[0].images).toEqual(['int1', 'int2', 'ext1', 'ext2']);
        expect(rearrangedData[1].images).toEqual(['int3', 'int1', 'ext3', 'ext1']);
        expect(rearrangedData[2].images).toEqual(['int2', 'int3', 'ext2', 'ext3']);
    });
});
