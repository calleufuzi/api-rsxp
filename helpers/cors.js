
const config = require('config');

//Configure CORS for all routes;
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || config.cors.origin.indexOf("*") !== -1 || config.cors.origin.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: config.cors.methods,
  preflightContinue: false,
  optionsSuccessStatus: 200 //some legacy browsers (IE11, various SmartTVs) choke on 204
};


module.exports = corsOptions;