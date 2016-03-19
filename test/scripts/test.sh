#!/bin/bash

knex migrate:rollback --knexfile config/knexfile.js --cwd database/
knex migrate:latest --knexfile config/knexfile.js --cwd database/
lab test/controllers
