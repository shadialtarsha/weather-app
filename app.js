const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');
//yargs configurations
const argv = yargs
    //we need options without commands
    .options({
        address: {
            describe: 'Address to fetch weather for',
            demand: true,
            alias: 'a',
            string: true
        }
    })
    .help()
    //alias for --help
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errMessage, weatherResults) => {
            if (errMessage) {
                console.log(errMessage);
            } else {
                console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
            }
        });
    }
});