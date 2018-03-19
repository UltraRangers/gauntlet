# Gauntlet 
Gauntlet is a Typescript server template based from the [ADR](https://github.com/pmjones/adr-example) design pattern.

## Build Status
* master ![CircleCI](https://circleci.com/gh/UltraRangers/gauntlet/tree/master.svg?style=svg&circle-token=5c2636d1ecb4f2b893096a495d90510ed591ece1)
* develop ![CircleCI](https://circleci.com/gh/UltraRangers/gauntlet/tree/develop.svg?style=svg&circle-token=5c2636d1ecb4f2b893096a495d90510ed591ece1)

## Prerequisites
- Node 8.4.0 or higher (you can try to manage your versions using [nvm](https://github.com/creationix/nvm))

## Installing
- git clone https://github.com/UltraRangers/gauntlet.git
- npm install
- Setup your database with the following
    - Create a database of your choice
    - In the `config/server/ormconfig.development.json`. Change the username, password and database name on your own. Each `ormconfig.json` is used by different environements. Change accordingly for the desired environment (dev, test, prod)
        ``` 
        {
            "type": "postgres",
            "host": "localhost",
            "port": 5432,
            "username": "postgres",
            "password": "postgres",
            "database": "gauntlet-development"
        }
        ```
- After that, you can now start your app by typing the command `npm start`
## Running the tests

To run the test suites, type in your terminal

    npm run test

Take note that you need to change your database config for **test** environment. See [installing](#Installing) on how to setup database.

## Built With
- [Nest.js](https://nestjs.com/) - Web framework
- [TypeORM](https://github.com/typeorm/typeorm) - Database Management
- [Angular](https://angular.io/) - Front-end

## Contributing
Open for pull requests!

## Versioning
We use [SemVer](https://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/UltraRangers/gauntlet/tags)

## Acknowledgments
- Hands down for the great works of [pleerock](https://github.com/pleerock) and [Nest.js](https://nestjs.com/) team
