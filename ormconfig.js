const env = process.env.NODE_ENV || 'development';
const config = require(process.cwd() + `/config/server/ormconfig.${env}.json`);

module.exports = config.typeorm;
