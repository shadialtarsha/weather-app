const request = require('request');

const getWeather = (lat, lng, callback) => {
    request({
        //Fill your APIKEY from https://darksky.net/dev
        url: `https://api.darksky.net/forecast/APIKEY/${lat},${lng}`,
        method: 'GET',
        json: true
    }, function(error, response, body) {
        let errorMessage;
        let results;
        if (!error && response.statusCode === 200) {
            results = {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            }
        } else {
            errorMessage = 'Unable to fetch weather.';

        }
        callback(errorMessage, results);
    });
}

module.exports = {
    getWeather,
}