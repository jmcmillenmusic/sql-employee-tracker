-- View All Departments
-- SELECT * FROM department;

-- View All Roles
SELECT role.id AS id, role.title AS Title, role.salary AS Salary, role.department_id AS Dept_ID, department.name AS Dept_Name
FROM role
JOIN department ON role.department_id = department.id;