require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('[CONNECTED TO THE DATABASE]');
  })
  .catch((err) => {
    console.error('[ERROR CONNECTING TO DB]', err);
  });

module.exports = mongoose;
