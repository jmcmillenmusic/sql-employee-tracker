db.query('SELECT employee.id AS id, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employee LEFT JOIN employee manager ON employee.manager_id = manager.id AND CASE WHEN employee.id != manager.id THEN true ELSE false END', function (err, results) {
    if (err) {
        console.log(err);
    } else {
        console.table(results);
        // let roles = results.map(({ title, id }) => ({
        //     'value': id,
        //     'name': title
        // }));
        // inquirer.prompt([
        //     {
        //         type: 'input',
        //         message: 'Please enter a title for this new role.',
        //         name: 'addTitle'
        //     },
        //     {
        //         type: 'input',
        //         message: 'Please enter a salary amount for this new role.',
        //         name: 'addSalary'
        //     },
        //     {
        //         type: 'list',
        //         message: 'Please choose a department for this new role.',
        //         name: 'addDeptID',
        //         choices: departments
        //     }
        // ])
        //     .then(function (answers) {
        //         newRole = {
        //             title: answers.addTitle,
        //             salary: answers.addSalary,
        //             department_id: answers.addDeptID
        //         };
        //         addRole(newRole);
        //     })
        //     .then(() => {
        //         setTimeout(init, 1000);
        //     })
    }
});