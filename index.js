const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  // success, print out the deets!
  printPassTimes(passTimes);
});


// // //it will require and run our main fetch function
// const { fetchMyIP,fetchCoordsByIp,fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   if (ip) {
//     console.log('It worked! Returned IP:' , ip);
//     fetchCoordsByIp(ip,(error,coords) => {
//       if (error) {
//         console.log("Did not work" , error);
//       }
//       if (coords) {
//         console.log('It worked! Return coordinates:', coords);
//         fetchISSFlyOverTimes(coords, (error,times) => {
//           if (error) {
//             console.log("Did not work" , error);
//           }
//           if (times) {
//             console.log('It worked! Return times:', times);
//           }
//           nextISSTimesForMyLocation((error, passTimes) => {
//             if (error) {
//               return console.log("It didn't work!", error);
//             }
         
//             console.log(passTimes);
//           });
//         });
//       }
//     });
//   }
// });
