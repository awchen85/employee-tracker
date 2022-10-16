const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');


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
    case 'UPDATE_EMPLOYEES':
        updateEmployees();
        break;
    case 'EXIT':
        process.exit();
        break;
    default:
        process.exit();
}
};

const viewEmployees = async () => {
    const [employeeData] = await db.query("SELECT * FROM employee");
    console.table(employeeData);
    mainMenu();
};
const viewDepartments = async () => {
    const [departmentData] = await db.query("SELECT * FROM department");
    console.table(departmentData);
    mainMenu();
};

const addDepartment = async () => {
    console.log('Fuck the letter S');
 const promptValue = await inquirer.prompt([
    {
            type: 'text',
            name: 'name',
            message: 'What department would you like to add?'
    },
 ])
console.log('1');
const sql = `INSERT INTO department (name) VALUES (?)`;

const params = [
    promptValue.name
];
console.log(2);
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
            name: 'role',
            message: "What role is your employee in?"
        },
        {
            type: 'input',
            name: 'manager',
            message: "Who is their manager?"
        },

    ])

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
(?,?,?,?)`;
const params = [
    promptValue.first_name,
    promptValue.last_name,
    promptValue.role,
    promptValue.manager,
];
db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(result);
    console.table(result);
    mainMenu();
});
}

  mainMenu();