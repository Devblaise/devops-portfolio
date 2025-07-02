// server/db.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool();

module.exports = pool;
// This code sets up a connection pool to a PostgreSQL database using the 'pg' library.
// It uses environment variables to configure the connection, allowing for flexibility in different environments (development, production, etc.).
// The connection pool is exported for use in other parts of the application, enabling efficient database interactions.
