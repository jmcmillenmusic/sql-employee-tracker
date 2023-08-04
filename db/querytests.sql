-- View All Departments
-- SELECT * FROM department;

-- View All Roles
-- SELECT role.id AS id, role.title AS Title, role.salary AS Salary, department.name AS Dept_Name
-- FROM role
-- JOIN department ON role.department_id = department.id;

-- View All Employees
SELECT employee.id AS id, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, department.name AS Dept_Name, role.salary AS Salary, employee.manager_id AS Mgr_First_Name, employee.manager_id AS Mgr_Last_Name
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;