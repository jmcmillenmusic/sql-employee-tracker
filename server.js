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

// db.query function to view all departments
function viewAllDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
};

// db.query function to view all roles
function viewAllRoles() {
  db.query('SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Dept_Name FROM role JOIN department ON role.department_id = department.id', function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
};

// db.query function to view all employees
function viewAllEmployees() {
  db.query('SELECT employee.id AS id, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, department.name AS Dept_Name, role.salary AS Salary, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id AND CASE WHEN employee.id != manager.id THEN true ELSE false END', function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});