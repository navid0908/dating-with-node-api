Dating-With-Node-Api
===================
This project is the backend api service for a dating site written entirely in javascript.

# Dependencies
The backend will use the following technologies and frameworks:

  - [NodeJS](http://nodejs.org/)
  - [Mysql](http://www.mysql.com/)
  - [Redis](http://redis.io/)
  - [Node-Mysql](https://github.com/felixge/node-mysql)
  - [Node-HapiJS](https://github.com/hapijs/hapi)
  - [Bookshelfjs](http://bookshelfjs.org)


# Installation
Once your enviornment is setup as per [Dating-With-Node-Cookbooks](https://github.com/salimkapadia/dating-with-node-cookbooks), follow the below installation steps.

 -  You should clone the [cookbooks](https://github.com/salimkapadia/dating-with-node-cookbooks) and this [app](github.com/salimkapadia/dating-with-node-api) under the same parent directory.

```bash
git clone https://github.com/salimkapadia/dating-with-node-api.git
```
- Install project dependencies (frameworks/libraries) using npm
```bash
cd dating-with-node-api.git
npm install -g
cp config/config.js.example config/config.js
```

- Load the db
```bash
knex migrate:latest --knexfile config/knexfile.js --cwd database/
```

# Workflow

### Starting the Application

       $ npm start

### Stopping the Application

       $ npm stop

### Making changes

#### Database (Mysql) 
Database changes are managed through [knex](http://knexjs.org/#Migrations).

* When creating migrations with [knex](http://knexjs.org/#Migrations), please use the following convention for the migrationName:
  - create-tableName when your script is creating a table
  - alter-tableName when your script is altering a table
  - drop-tableName when your script is dropping a table.
* Table names should be singular. See [stackoverflow](http://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names) for explanation.
* Foreign keys should be lowercase like so: fk\_foreignKeyTableName\_primaryKeyTableName

#### Controllers

* Should be saved in the controllers directory.
* Filename should be camelCased and end with the word Controller like so - taskController.js
* Controllers should look like this:
```js
//bodytypeController.js

exports.get = {
  description: "Lookup for various body types",
  validate: {},
  handler: function (request, reply) {
  }
}

exports.post = {
  validate: {},
  handler: function (request, reply) {
  }
}
```


# Testing
Please keep in mind that during the build process, the test directory is not checked out. The application can be tested like so:

       $ npm test

# Seed data
If you need to add seed data for your tests, use [knex seed-cli](http://knexjs.org/#Seeds-CLI).

- Adding a seed file:
```bash
cd test
knex seed:make --knexfile ../config/knexfile.js --cwd database/ insert-users
```
- Running seed files:
```bash
cd test
knex seed:run --knexfile ../config/knexfile.js --cwd database/
```

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