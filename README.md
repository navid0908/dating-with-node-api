# Dating-With-Node-Api
This project is the backend api service for a dating site written entirely in javascript.

# Dependencies
The backend will use the following technologies and frameworks:

  - [NodeJS](http://nodejs.org/)
  - [Mysql](http://www.mysql.com/)
  - [Redis](http://redis.io/)
  - [Node-Mysql](https://github.com/felixge/node-mysql)
  - [Node-HapiJS](https://github.com/hapijs/hapi)
  - [Node-Db-Migrate](https://github.com/kunklejr/node-db-migrate)


# Installation
Once your enviornment is setup as per [Dating-With-Node-Cookbooks](https://github.com/salimkapadia/dating-with-node-cookbooks), follow the below installation steps.

## Installation Steps

1. Check out the repo
You should clone the [cookbooks](https://github.com/salimkapadia/dating-with-node-cookbooks) and this app under the same parent directory.
```bash
git clone https://github.com/salimkapadia/dating-with-node-api.git
```
1. Install project dependencies (frameworks/libraries) using npm
```bash
cd dating-with-node-api.git
npm install
cp config/config.js.example config/config.js
```
1. Load the db
```bash
cd database
db-migrate up --config ../config/config.js -e database
```

# Workflow

### Starting the Application

	$ npm start

### Stopping the Application

	$ npm stop

### Making changes

#### Database (Mysql) 
Database changes are managed through [db-migrate](https://github.com/kunklejr/node-db-migrate). When creating migrations with [db-migrate](https://github.com/kunklejr/node-db-migrate), please use the following convention for the migrationName:
  - create-tableName when your script is creating a table
  - alter-tableName when your script is altering a table
  - drop-tableName when your script is dropping a table.

On a side note, table names should be singular. See [stackoverflow](http://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names) for explanation.

http://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names


# Testing
The application can be tested like so:

	$ npm test

# Troubleshooting
If you run into an error, make sure the database is created and that both node and the modules are in your PATH. To facilitate fast iterations, run [Nodemon](https://github.com/remy/nodemon) locally.

```bash
npm install nodemon
nodemon
```

# Documentation
API docs are provided via the [lout](https://github.com/hapijs/lout) plugin. In a browser, if you navigate to http://localhost:8080/docs you’ll see a list of routes that are configured as well as the HTTP method they use.

License
=========
MIT [http://rem.mit-license.org](http://rem.mit-license.org)