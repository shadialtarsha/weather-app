const axios = require('axios');
const yargs = require('yargs');

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

const url = encodeURI('http://maps.googleapis.com/maps/api/geocode/json?address=' + argv.address);

const fetchGeoCode = (response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    if (response.data.status === 'OVER_QUERY_LIMIT') {
        throw new Error('Over query limit.');
    }
    const address = response.data.results[0].formatted_address;
    console.log(address);
    const location = response.data.results[0].geometry.location;
    const lat = location.lat;
    const lng = location.lng;
    //Fill your APIKEY from https://darksky.net/dev
    return axios.get(`https://api.darksky.net/forecast/APIKEY/${lat},${lng}`);
}

const fetchWeather = (response) => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}

const handleErrors = (e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to Google servers.');
    } else {
        console.log(e.message);
    }
}

axios.get(url)
    .then(fetchGeoCode)
    .then(fetchWeather)
    .catch(handleErrors);