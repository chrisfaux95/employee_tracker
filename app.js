// IMPORTING INQUIRER
const inquirer = require("inquirer");
// IMPORTING QUESTIONS
const { mainMenuQuestions, employeesQuestions, roleQuestions, departmentQuestions } = require("./lib/questions");
// IMPORTING MYSQL CONNECTION
const connection = require("./lib/connection");

function mainMenu() {
    inquirer.prompt(mainMenuQuestions).then(res => {
        switch (res.questions) {
            case 'Manage Employees':
                console.log("MANAGE EMPLOYEES");
                manageEmployees();
                break;
            case 'Manage Roles':
                console.log("MANAGE ROLES");
                manageRoles();
                break;
            case 'Manage Departments':
                console.log("MANAGE DEPARTMENTS");
                manageDepartments();
                break;
            default:
                // console.log("END")
                process.exit()
                break;
        }
    })
}

function manageEmployees() {
    inquirer.prompt(employeesQuestions).then(res => {
        // console.log(res.employees);
        switch (res.employees) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add Employee":
                addNewEmployee();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            default:
                mainMenu();
                break;
        }
    })
}

function manageRoles() {
    inquirer.prompt(roleQuestions).then(res => {
        console.log(res.role);
        mainMenu();
    })
}

function manageDepartments() {
    inquirer.prompt(departmentQuestions).then(res => {
        // console.log(res.departments);
        switch (res.departments) {
            case "View Departments":
                // console.log("VIEWING");
                viewDepartments();
                break;
            case "Add Departments":
                addDepartment();
                break;
            case "Remove Departments":
                removeDepartment();
                break;
            default:
                mainMenu();
                break;
        }
    })
}
///////////////////////////
//  EMPLOYEE FUNCTIONS   //
/////////////////////////// 

function viewAllEmployees() {
    let qStr = "SELECT employees.first_name, "
    qStr += "employees.last_name, roles.title "
    qStr += "FROM employees, roles WHERE employees.role_id "
    qStr += "= roles.id"

    connection.query(qStr, (err, res) => {
        if (err) console.log(err);
        console.log("\n")
        console.table(res);
        manageEmployees();
    });
}

function viewAllEmployeesByRole() {
    let qStr = "SELECT employees.first_name, employees.last_name, roles.title FROM employees, roles ORDER BY role_id"
    connection.query(qStr, (err, res) => {
        if (err) console.log(err);
        console.table(res);
    })
}

function viewAllEmployeesByDept() {
    "SELECT employees.first_name, employees.last_name, roles.title FROM employees, roles ORDER BY role_id"
}

function addNewEmployee() {
    inquirer.prompt([{
        name: "firstName",
        type: "input",
        message: "What is their first name?"
    },
    {
        name: "lastName",
        type: "input",
        message: "What is their last name?"
    },
    {
        name: "role_id",
        type: "input",
        message: "What is their role?"
    },
    {
        name: "manager_id",
        type: "input",
        message: "Who is their manager?"
    }
    ]).then()
}

function removeEmployee() {
    inquirer.prompt({
        name: "employee",
        type: "list",
        message: "Which Employee Would You Like To Remove?"
    })
}

///////////////////////////
// DEPARTMENT FUNCTIONS  //
/////////////////////////// 

function addDepartment() {
    inquirer.prompt({
        name: "dept",
        type: "input",
        message: "What is this new Department called?"
    }).then((answer) => {
        let qStr = "INSERT INTO departments (name) VALUE ?";
        connection.query(qStr, answer.dept, (err, res) => {
            if (err) throw err;
            console.log(`New Department, ${answer.dept}, created.`);
            manageDepartments();
        })
    })
}

function viewDepartments() {
    let qStr = "SELECT * FROM departments";
    console.log("VIEWING");
    connection.query(qStr, (err, res) => {
        if (err) throw err;
        console.log("VIEWING")
        console.table(res);
        manageDepartments();
    })
}

function removeDepartment() {
    inquirer.prompt({
        name: "dept",
        type: "list",
        message: "Which Department would you like to remove?",
        choices: []
    }).then((ans) => {
        let qStr = "DELETE FROM departments WHERE name=?";
        connection.query(qStr, name, (err, res) => {
            if (err) console.log(err);
            // console.table(res);
        })
    })
}


///////////////////////////
//    ROLE FUNCTIONS     //
/////////////////////////// 

function viewRoles() {
    let qStr = "SELECT * FROM roles"
    connection.query(qStr, (err, res) => {
        if (err) console.log(err);
        console.table(res);
        manageRoles();
    })
}

function addRole() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the role's title?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary?"
        },
        {
            name: "dept",
            type: "list",
            message: "What Department is it in?"
        }
    ]).then((ans) => {
        let qStr = "INSERT INTO roles (title, salary, ) VALUES (?, ?, ?)";
        connection.query(qStr, [title, salary, department_id], (err, res) => {
            if (err) console.log(err);
            // console.table(res);
            console.log("Created New Role!")
        })
    })
}


mainMenu()