const mongoose = require('mongoose');

module.exports.connect = (uri) => {
  console.log("URI:", uri);
  mongoose.connect(uri);
  // plug in the promise library:
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  // load models
  require('./bike');
  require('./bikebooking');
  require('./period');
  require('./user');
  require('./token');
};
