const { getCurrentDate, validateProperty } = require('../routes/utils/lease-upload-utils');

describe('getCurrentDate', () => {
    test('should return current date in yyyy-mm-dd format', () => {
        const currentDate = new Date();
        const expectedDate = 
            `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).
                padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
        expect(getCurrentDate()).toEqual(expectedDate);
    });
});

describe('validateProperty', () => {
    test('should return true for valid property', () => {
        const property = {
            rentPrice: 1000,
            address: '123 Main St',
            contactInfo: '123-456-7890',
            size: 1000,
            bedrooms: 3,
            bathrooms: 2,
            floorNumber: 2,
            furnishing: 'Furnished'
        };
        expect(validateProperty(property)).toBe(true);
    });

    test('should return false if any required field is missing', () => {
        const property = {
            rentPrice: 1000,
            // Missing address
            contactInfo: '123-456-7890',
            size: 1000,
            bedrooms: 3,
            bathrooms: 2,
            floorNumber: 2,
            furnishing: 'Furnished'
        };
        expect(validateProperty(property)).toBe(false);
    });

    test('should return false if any required field is empty', () => {
        const property = {
            rentPrice: 1000,
            address: '', 
            contactInfo: '123-456-7890',
            size: 1000,
            bedrooms: 3,
            bathrooms: 2,
            floorNumber: 2,
            furnishing: 'Furnished'
        };
        expect(validateProperty(property)).toBe(false);
    });

    test('should return false if any numeric field is not a number', () => {
        const property = {
            rentPrice: '1000', 
            address: '123 Main St',
            contactInfo: '123-456-7890',
            size: 1000,
            bedrooms: 3,
            bathrooms: 2,
            floorNumber: 'sss',
            furnishing: 'Furnished'
        };
        expect(validateProperty(property)).toBe(false);
    });
});
