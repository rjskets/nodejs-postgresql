require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");

const app = express();

// PostgreSQL pool setup
const pool = new Pool({
  user: process.env.RDS_USERNAME,
  host: process.env.RDS_HOSTNAME,
  database: process.env.RDS_DB_NAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  ssl: {
    rejectUnauthorized: false,
  }
});

// Simple route to test database connection
app.get("/users", async (req, res) => {
  try {
    // Add some users to the database
    await pool.query(`
      INSERT INTO users (name, email) VALUES
      ('John Doe', 'john@example.com'),
      ('Jane Smith', 'jane@example.com'),
      ('Bob Johnson', 'bob@example.com')
      ON CONFLICT (email) DO NOTHING
    `);

    // Fetch all users
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send(
        `Server Error: ${err.message} ${err.stack} ${err.code} ${process.env.RDS_DB_NAME} ${process.env.RDS_HOSTNAME} ${process.env.RDS_PASSWORD} ${process.env.RDS_PORT} ${process.env.RDS_USERNAME}`
      );
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
