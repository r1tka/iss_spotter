// // //It will contain most of the logic for fetching the data from each API endpoint.

const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg),null);
      return;
    }
    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIp = function(ip,callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coords. Response: ${body}`;
      callback(Error(msg),null);
      return;
    }
    const responseData = JSON.parse(body);
    const coords = {latitude: responseData.latitude,
      longitude: responseData.longitude};
    callback(null, coords);
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coords. Response: ${body}`;
      callback(Error(msg),null);
      return;
    }
    callback(null, JSON.parse(body));
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
  
    fetchCoordsByIp(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
  
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        const passTimes = nextPasses.response;
        callback(null, passTimes);
      });
    });
  });
};
  

    
  


module.exports = { nextISSTimesForMyLocation };