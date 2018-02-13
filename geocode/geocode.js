const request = require('request');

const geocodeAddress = (address, callback) => {

    const url = encodeURI('http://maps.googleapis.com/maps/api/geocode/json?address=' + address);

    request({
        url,
        method: 'GET',
        json: true
    }, (error, res, body) => {
        let errorMessage;
        let results;
        if (error) {
            errorMessage = 'Unable to connect to Google servers.';
        } else if (body.status === 'ZERO_RESULTS') {
            errorMessage = 'Unable to find that address.';
        } else if (body.status === 'OVER_QUERY_LIMIT') {
            errorMessage = 'Over query limit.';
        } else if (body.status === 'OK') {
            const address = body.results[0].formatted_address;
            const location = body.results[0].geometry.location;
            results = {
                address,
                latitude: location.lat,
                longitude: location.lng
            }
        }
        callback(errorMessage, results);
    });
}

module.exports = {
    geocodeAddress
}