// Declares initial required variables and functions from server.js
const inquirer = require('inquirer');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./server');

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
      .then(function(answers) {
        switch(answers.actions) {
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
                    .then(function(answers) {
                        newDeptName = answers.addDept;
                        addDepartment(newDeptName);
                    });
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