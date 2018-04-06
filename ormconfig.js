const env = process.env.NODE_ENV || 'development';
const config = require(process.cwd() + `/config/server/ormconfig.${env}`);
config.entities = [ __dirname + '/dist/server/app/**/*.entity.js' ];
config.migrations = [ __dirname + '/dist/server/utils/migrations/*.js' ];
config.cli = { migrationsDir: '/src/server/utils/migrations/' }; 

if (process.env['DATABASE_HOST']) config.host = process.env['DATABASE_HOST'];

module.exports = config;