const env = process.env.NODE_ENV || 'development';
const config = require(process.cwd() + `/config/server/ormconfig.${env}.json`);

config.entities = [ __dirname + '/dist/server/app/database/entities/*.entity.js' ];
config.migrations = [ __dirname + '/dist/server/app/database/migrations/*.js' ];
config.cli = { migrationsDir: '/src/server/app/database/migrations/' };

module.exports = config;
