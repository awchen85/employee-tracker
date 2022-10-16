const inquirer = require('inquirer');
const mysql = require('mysql2');
// require('console.table');


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'MySQL32252511',
      database: 'employees'
    },
    console.log(`Connected to the employees database.`)
  )
.promise();

const mainMenu = async () => {
const promptValue = await inquirer.prompt([
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            {
            name: 'View All Roles',
            value: 'VIEW_ROLE'
            },
            {
            name: 'View All Employees',
            value: 'VIEW_EMPLOYEES'
            },
            {
            name: 'View All Departments',
            value: 'VIEW_DEPARTMENTS'
            },
            {
            name: 'Add a Department',
            value: 'ADD_DEPARTMENT'
            },
            {
                name: 'Add an Employee',
                value: 'ADD_EMPLOYEE'
                },
            {
            name: 'Add a Role',
            value: 'ADD_ROLE'
            },
            {
            name: 'Update An Employee',
            value: 'UPDATE_EMPLOYEE'
            },
            {
            name: 'Exit',
            value: 'EXIT'
            },
        ],
    },
]);

switch (promptValue.choice) {
    case 'VIEW_ROLE':
        viewRole();
        break;
    case 'VIEW_EMPLOYEES':
        viewEmployees();
        break;
    case 'VIEW_DEPARTMENTS':
        viewDepartments();
        break;
    case 'ADD_DEPARTMENT':
        addDepartment();
        break;
    case 'ADD_ROLE':
        addRole();
        break;
    case 'ADD_EMPLOYEE':
        addEmployee();
        break;
    case 'UPDATE_EMPLOYEE':
        updateEmployee();
        break;
    case 'EXIT':
        process.exit();
        break;
    default:
        process.exit();
}
};

const viewEmployees = async () => {
    const [employeeData] = await db.query(`SELECT employee.id, employee.first_name,
    employee.last_name,
    role.title,
    department.name AS department,
    role.salary,
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`);
    console.table(employeeData);
    mainMenu();
};
const viewDepartments = async () => {
    const [departmentData] = await db.query("SELECT * FROM department");
    console.table(departmentData);
    mainMenu();
};

const viewRole = async () => {
    const [roleData] = await db.query(`SELECT
    role.title AS job_title,
    role.id,
    department.name AS department,
    role.salary FROM role
    LEFT JOIN department ON role.department_id = department.id`);
    console.table(roleData);
    mainMenu();
};

const addDepartment = async () => {
 const promptValue = await inquirer.prompt([
    {
            type: 'text',
            name: 'name',
            message: 'What department would you like to add? (Use 1-5 for departments)'
    },
 ]);
const sql = `INSERT INTO department (name) VALUES (?)`;

const params = [
    promptValue.name
];
db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
});
console.log('Department has been added.');
mainMenu();
};

const addRole = async () => {
    const promptValue = await inquirer.prompt([
       {
               type: 'text',
               name: 'title',
               message: 'What is the title of the role?'
       },
       {
                type: 'int',
                name: 'salary',
                message: 'What is the salary of the role?'
        },
        {
                type: 'text',
                name: 'department',
                message: 'What department is this role in? (Use 1-5 for departments)'
        },
    ]);
   const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
   const params = [
       promptValue.title,
       promptValue.salary,
       promptValue.department
   ];

   db.query(sql, params, (err, result) => {
       if (err) {
           console.log(err);
           return;
       }
   });
   console.log('Department has been added.');
   mainMenu();
   };

const addEmployee = async () => {
    const promptValue = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is your employee's first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is your employee's last name?"
        },
        {
            type: 'input',
            name: 'role_id',
            message: "What role is your employee in? (Use 1-5 for roles)"
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "Who is their manager?"
        },

    ]);

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    (?,?,?,?)`;
const params = [
    promptValue.first_name,
    promptValue.last_name,
    promptValue.role_id,
    promptValue.manager_id,
];
db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
});
    mainMenu();
}

const updateEmployee = async () => {
    const [employeeData] = await db.query(`SELECT * FROM employee`);
    console.table(employeeData);
    const promptValue =  await inquirer.prompt([
    {
    type: 'int',
    name: 'employee_id',
    message: 'Which employee ID would you like to update?'
    },
]);
const [roleData] = await db.query(`SELECT * FROM role`);
console.table(roleData);
const promptValueTwo = await inquirer.prompt([
    {
    type: 'int',
    name: 'role_id',
    message: "What is the employee's new role? (Use 1-5 for roles)"
    },
]);

const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
const params = [
    promptValueTwo.role_id,
    promptValue.employee_id,
]
db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
});
mainMenu();
};



  mainMenu();
