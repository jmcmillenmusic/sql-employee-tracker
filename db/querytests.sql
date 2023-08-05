-- View All Departments
-- SELECT * FROM department;

-- View All Roles
-- SELECT role.id AS id, role.title AS Title, role.salary AS Salary, department.name AS Dept_Name
-- FROM role
-- JOIN department ON role.department_id = department.id;

-- View All Employees
-- SELECT employee.id AS id, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, department.name AS Dept_Name, role.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
-- FROM employee
-- LEFT JOIN role ON employee.role_id = role.id
-- LEFT JOIN department ON role.department_id = department.id
-- LEFT JOIN employee manager ON employee.manager_id = manager.id AND CASE WHEN employee.id != manager.id THEN true ELSE false END;

-- Add a department
INSERT INTO department (name)
VALUES ("Human Resources");
SELECT * FROM department;