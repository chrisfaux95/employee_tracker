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
        console.log(res.employees);
        mainMenu();
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
        console.log(res.departments);
        mainMenu();
    })
}


mainMenu()