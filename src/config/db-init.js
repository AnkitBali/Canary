// MongoDb
const mongoose = require('mongoose');
const config = require('../config');

(async () => {
    mongoose.connect(config.database.url, config.database.options);
})();