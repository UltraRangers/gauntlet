const env = process.env.NODE_ENV || 'development';
const config = require(process.cwd() + `/src/server/config/config.${env}.json`);

module.exports = config.typeorm;
