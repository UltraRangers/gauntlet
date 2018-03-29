const env = process.env.NODE_ENV || 'development';
const config = require(process.cwd() + `/config/server/ormconfig.${env}.json`);

config.entities = [ __dirname + '/dist/server/entities/*.entity.js' ];
config.migrations = [ __dirname + '/dist/server/utils/migrations/*.js' ];
config.cli = { migrationsDir: '/src/server/utils/migrations/' };

module.exports = config;
