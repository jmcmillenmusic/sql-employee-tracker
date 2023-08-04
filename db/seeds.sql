INSERT INTO department (name)
VALUES  ("Sales"),
        ("Warehouse"),
        ("IT");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 60000, 1),
        ("Sales Associate", 54000, 1),
        ("Warehouse Lead", 50000, 2),
        ("Warehouse Associate", 45000, 2),
        ("IT Lead", 75000, 3),
        ("IT Associate", 67500, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Phoebe", "Buffay", 1, NULL),
        ("Rachel", "Green", 2, 1),
        ("Chandler", "Bing", 3, NULL),
        ("Joey", "Tribbiani", 4, 3),
        ("Ross", "Geller", 5, NULL),
        ("Monica", "Geller", 6, 5);