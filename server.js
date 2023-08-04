// Import and require Express
const express = require('express');

// Import and require mysql2
const mysql = require('mysql2');

// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'friends',
      database: 'employee_db'
    },
    console.log(`You are connected to the employee_db database!`)
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });