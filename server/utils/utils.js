
const canadianCities = ['Toronto', 'Montreal', 'Vancouver', 
    'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City'];

// Object containing area/locality options for each city
const areaLocalities = {
    Toronto: ['Downtown', 'Scarborough', 'North York', 'Etobicoke', 'York', 'East York'],
    Montreal: ['Downtown', 
        'Plateau-Mont-Royal', 'Ville-Marie', 'Côte-des-Neiges–Notre-Dame-de-Grâce', 'Le Sud-Ouest'],
    Vancouver: ['Downtown', 'West End', 'Yaletown', 'Gastown', 'Coal Harbour'],
    Calgary: ['Downtown', 'Beltline', 'Eau Claire', 'Chinatown'],
    Edmonton: ['Downtown', 'Oliver', 'Strathcona', 'Glenora'],
    Ottawa: ['Downtown', 'Centretown', 'ByWard Market', 'Sandy Hill'],
    Winnipeg: ['Downtown', 'Osborne Village', 'Exchange District', 'St. Boniface'],
    'Quebec City': ['Old Quebec', 'Saint-Roch', 'Saint-Jean-Baptiste', 'Montcalm']
};

// Function to generate a random number within a range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get a random city and area/locality pair
function getRandomCityLocalityPair() {
    const randomCityIndex = getRandomNumber(0, canadianCities.length - 1);
    const randomCity = canadianCities[randomCityIndex];
    const localitiesInCity = areaLocalities[randomCity];
    const randomLocality = localitiesInCity[getRandomNumber(0, localitiesInCity.length - 1)];
    return { city: randomCity, areaLocality: randomLocality };
}

function getRandomDate() {
    // randomly get a date that starts from beginning of 2024 till current date
    const startDate = new Date('2024-01-01'); 
    const endDate = new Date(); 

    // Calculate the difference in milliseconds between the start and end date
    const difference = endDate.getTime() - startDate.getTime();

    // Generate a random number within the range of the time difference
    const randomOffset = Math.random() * difference;

    // Set the new date using the random offset
    const randomDate = new Date(startDate.getTime() + randomOffset);

    // Format the random date in YYYY-MM-DD structure
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, '0');
    const day = String(randomDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function getConvertedPrice(indianPrice){
    const exchangeRateINRtoCAD = 0.018;
    return indianPrice * exchangeRateINRtoCAD;
}

module.exports = { getRandomCityLocalityPair, getConvertedPrice, getRandomDate};