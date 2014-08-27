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
1. Install the project dependencies (frameworks/libraries) using npm
```bash
cd dating-with-node-api.git
npm install
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

### Making db changes
We use [db-migrate](https://github.com/kunklejr/node-db-migrate) to manage database changes.

# Troubleshooting
If you run into an error, make sure the database is created and that both node and the modules are in your PATH. To facilitate fast iterations, run [Nodemon](https://github.com/remy/nodemon) locally.

```bash
npm install nodemon
nodemon
```

License
=========
MIT [http://rem.mit-license.org](http://rem.mit-license.org)