const env = process.env.NODE_ENV || 'development';
let config;
try {
  config = require(process.cwd() + `/config/server/ormconfig.${env}.json`);
} catch (error) {
  // get the development config as the fallback
  config = require(process.cwd() + `/config/server/ormconfig.development.json`);
} finally {
  config.entities = [ __dirname + '/dist/server/entities/*.entity.js' ];
  config.migrations = [ __dirname + '/dist/server/utils/migrations/*.js' ];
  config.cli = { migrationsDir: '/src/server/utils/migrations/' };  
}

if (process.env.NODE_ENV === 'docker' && process.env['DATABASE_HOST']) config.host = process.env['DATABASE_HOST'];

module.exports = config;
