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
      console.table(results);
    }
  });
};

// db.query function to view all roles
function viewAllRoles() {
  db.query('SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Dept_Name FROM role JOIN department ON role.department_id = department.id', function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
};

// db.query function to view all employees
function viewAllEmployees() {
  db.query('SELECT employee.id AS id, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, department.name AS Dept_Name, role.salary AS Salary, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id AND CASE WHEN employee.id != manager.id THEN true ELSE false END', function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
};

// db.query function to add a department
function addDepartment(newDeptName) {
  // Requires the name of the new deparment to be passed into the prepared statement
  db.query(`INSERT INTO department (name)
  VALUES ("${newDeptName}")`, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`${newDeptName} Department Added!`);
    }
  });
  db.query('SELECT * FROM department', function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
};

// db.query function to add a role
function addRole() {
  // Requires the name of the new role, its salary, and its department_id to be passed into the prepared statement
  const newRole = {
    title: 'HR Specialist',
    salary: 42500,
    department_id: 4
  };
  db.query(`INSERT INTO role (title, salary, department_id)
  VALUES ("${newRole.title}", ${newRole.salary}, ${newRole.department_id})`, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`${newRole.title} Role Added!`);
    }
  });
  db.query('SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Dept_Name FROM role JOIN department ON role.department_id = department.id', function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
};

// db.query function to add an employee
function addEmployee() {
  // Requires the new employee's first name, last name, role_id, and manager_id to be passed into the prepared statement
  const newEmployee = {
    first_name: 'Gina',
    last_name: 'Tribbiani',
    role_id: 7,
    manager_id: null
  };
  if (newEmployee.manager_id = null) {
    newEmployee.manager_id = 'NULL';
  }
  db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES ("${newEmployee.first_name}", "${newEmployee.last_name}", ${newEmployee.role_id}, ${newEmployee.manager_id})`, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`${newEmployee.first_name} ${newEmployee.last_name} has been hired!`);
    }
  });
  db.query('SELECT employee.id AS id, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON employee.manager_id = manager.id AND CASE WHEN employee.id != manager.id THEN true ELSE false END', function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
};

// db.query function to update an employee's role
function updateEmployeeRole() {
  // Requires the updated employee's new role_id and id to be passed into the prepared statement
  const updateEmpRole = {
    role_id: 2,
    id: 7
  };
  db.query(`UPDATE employee SET role_id = ${updateEmpRole.role_id} WHERE id = ${updateEmpRole.id}`, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Someone got a new role!');
    }
  });
  db.query('SELECT employee.id AS id, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title FROM employee LEFT JOIN role ON employee.role_id = role.id', function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
    }
  });
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };