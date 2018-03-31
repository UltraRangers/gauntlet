const env = process.env.NODE_ENV || 'development';
let config;

try {
  config = require(process.cwd() + `/config/client/webpack.${env}`); 
} catch (error) {
  // fallback to development
  config = require(process.cwd() + `/config/client/webpack.development`);
}

module.exports = config;
