// Declares initial required variables and functions from server.js
const inquirer = require('inquirer');
const { db, viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./server');

// Object array with a list of options for the user to interact with the employee_db
const dbActions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'actions',
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee's Role"]
    }
];

// Prompts for the user to enter information when they wish to add a role
const addDeptAction = [
    {
        type: 'input',
        message: 'Please enter a name for this new department.',
        name: 'addDept'
    }
];

// Runs the initialization function to start the prompt and execute the answers based on user input
function init() {
    inquirer.prompt(dbActions)
        .then(function (answers) {
            switch (answers.actions) {
                case "View All Departments":
                    viewAllDepartments();
                    setTimeout(init, 1000);
                    break;
                case "View All Roles":
                    viewAllRoles();
                    setTimeout(init, 1000);
                    break;
                case "View All Employees":
                    viewAllEmployees();
                    setTimeout(init, 1000);
                    break;
                case "Add a Department":
                    inquirer.prompt(addDeptAction)
                        .then(function (answers) {
                            newDeptName = answers.addDept;
                            addDepartment(newDeptName);
                        })
                        .then(() => {
                            setTimeout(init, 1000);
                        })
                    break;
                case "Add a Role":
                    db.query('SELECT * FROM department', function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            let departments = results.map(({ name, id }) => ({
                                'value': id,
                                'name': name
                            }));
                            inquirer.prompt([
                                {
                                    type: 'input',
                                    message: 'Please enter a title for this new role.',
                                    name: 'addTitle'
                                },
                                {
                                    type: 'input',
                                    message: 'Please enter a salary amount for this new role.',
                                    name: 'addSalary'
                                },
                                {
                                    type: 'list',
                                    message: 'Please choose a department for this new role.',
                                    name: 'addDeptID',
                                    choices: departments
                                }
                            ])
                                .then(function (answers) {
                                    newRole = {
                                        title: answers.addTitle,
                                        salary: answers.addSalary,
                                        department_id: answers.addDeptID
                                    };
                                    addRole(newRole);
                                })
                                .then(() => {
                                    setTimeout(init, 1000);
                                })
                        }
                    });
                    break;
                case "Add an Employee":
                    db.query('SELECT role.id AS ID, role.title AS Title FROM role', function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            let roles = results.map(({ Title, ID }) => ({
                                'value': ID,
                                'name': Title
                            }));
                            db.query('SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name FROM employee WHERE manager_id IS NULL', function (err, results2) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    let managers = results2.map(({ First_Name, Last_Name, ID }) => ({
                                        'value': ID,
                                        'name': `${First_Name} ${Last_Name}`
                                    }));
                                    inquirer.prompt([
                                        {
                                            type: 'input',
                                            message: 'Please enter the first name of the new employee.',
                                            name: 'newFirstName'
                                        },
                                        {
                                            type: 'input',
                                            message: 'Please enter the last name of the new employee.',
                                            name: 'newLastName'
                                        },
                                        {
                                            type: 'list',
                                            message: 'Please choose a role for this new employee.',
                                            name: 'newRole',
                                            choices: roles
                                        },
                                        {
                                            type: 'list',
                                            message: 'Please assign a manager to this new employee if they have one.',
                                            name: 'newManager',
                                            choices: managers
                                        }
                                    ])
                                        .then(function (answers) {
                                            newEmployee = {
                                                first_name: answers.newFirstName,
                                                last_name: answers.newLastName,
                                                role_id: answers.newRole,
                                                manager_id: answers.newManager
                                            };
                                            addEmployee(newEmployee);
                                        })
                                        .then(() => {
                                            setTimeout(init, 1000);
                                        })
                                }
                            }
                            )
                        }
                    })
                    break;
                case "Update an Employee's Role":
                    db.query('SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name FROM employee', function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            let empList = results.map(({ First_Name, Last_Name, ID }) => ({
                                'value': ID,
                                'name': `${First_Name} ${Last_Name}`
                            }));
                            db.query('SELECT role.id AS ID, role.title AS Title FROM role', function (err, results2) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    let roleList = results2.map(({ Title, ID }) => ({
                                        'value': ID,
                                        'name': Title
                                    }));
                                    inquirer.prompt([
                                        {
                                            type: 'list',
                                            message: 'Please select an employee to grant a new position.',
                                            name: 'shiftedEmp',
                                            choices: empList
                                        },
                                        {
                                            type: 'list',
                                            message: 'Please choose a new role for this employee.',
                                            name: 'grantedRole',
                                            choices: roleList
                                        }
                                    ])
                                        .then(function (answers) {
                                            updateEmpRole = {
                                                role_id: answers.grantedRole,
                                                id: answers.shiftedEmp,
                                            };
                                            updateEmployeeRole(updateEmpRole);
                                        })
                                        .then(() => {
                                            setTimeout(init, 1000);
                                        })
                                }
                            })
                        }
                    })
                    break;
                default:
                    console.log("Error");
                    setTimeout(init, 1000);
                    break;
            }
        });
}

// Function call to initialize app after server.js finishes connecting to the database and showing which port it's running on
setTimeout(init, 1000);