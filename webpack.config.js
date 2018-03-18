const env = process.env.NODE_ENV || 'development';
const config = require(process.cwd() + `/config/client/webpack.${env}`);

module.exports = config;
