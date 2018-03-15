const env = process.env.NODE_ENV || 'development';
const config = require(process.cwd() + `/src/client/config/webpack.${env}`);

module.exports = config;
