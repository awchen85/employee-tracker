use employees;

INSERT INTO department
(name)
VALUES
 ('Sales'),
 ('IT'),
 ('Marketing'),
 ('Legal'),
 ('Finance');

INSERT INTO role
(title, salary, department_id)
VALUES
 ('Sales Lead', 75000, 1),
 ('IT Support', 65000, 2),
 ('Market Analyst', 45000, 3),
 ('Lawyer', 30000, 4),
 ('Accountant', 50000, 5);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
 ('Alex', 'Chen', 1, NULL),
 ('David', 'Dowell', 2, 4),
 ('Mitchell', 'Armstrong', 3, NULL),
 ('Teresa', 'Hartsfield', 4, NULL),
 ('Patrick', 'MacDonald', 4, NULL);