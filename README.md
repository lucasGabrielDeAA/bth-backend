# bth-backend

This API uses some nice features. Take a look on each one.

- [nodemon](https://nodemon.io/gdsf)
- [SQLite](https://www.sqlite.org/)
- [Knex](http://knexjs.org/)

# Installing the application

```
  yarn install
  npm install
```

# Database

```
  npx knex migrate:latest
```

# Starting the application

```
  yarn start
  npm start
```

# API's endpoints

```
  Incidents

  GET - /incidents?page=page - Retrieve all incidents in the database. Paginated.
  GET - /incidents/ong - Retrieve all incidents by the ONG's authentication token sent on request's header information.
  POST - /incidents - Create a new incident for the ONG with the authentication token sent on request's header information and return the Incident's ID.
  DELETE - /indicents/:id - Delete the incident with the ID's information sent on request's param, and the ONG's authentication token sent on request's header.

  ONG's

  GET - /ongs - Retrieve all the ongs in the database.
  POST - /ongs - Create a new ong and return the ONG's authentication token.
```
