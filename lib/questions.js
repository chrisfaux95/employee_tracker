const mainMenuQuestions = {
    name: "questions",
    type: "list",
    message: "What Would You Like To Do?",
    choices: [
        "Manage Employees",
        "Manage Roles",
        "Manage Departments",
        "Exit"
    ]
}

const employeesQuestions = {
    name: "employees",
    type: "list",
    message: "Manage Employees?",
    choices: [
        "View All Employees",
        "View Employees By Department",
        "View Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Return"
    ]
}

const roleQuestions = {
    name: "role",
    type: "list",
    message: "Manage Roles",
    choices: [
        "View All Roles",
        "Add Role",
        "Remove Role",
        "Return"
    ]
}

const departmentQuestions = {
    name: "departments",
    type: "list",
    message: "Manage Department",
    choices: [
        "View All Deparments",
        "Add Departments",
        "Remove Departments",
        "Return"
    ]
}

const allChoices = [
    "View All Employees",
    "View Employees By Department",
    "View Employees By Manager",
    "Add Employee",
    "Remove Employee",
    "Update Employee Role",
    "Update Employee Manager",
    "View All Roles",
    "Add Role",
    "Remove Role",
    "View All Deparments",
    "Add Departments",
    "Remove Departments"
]

module.exports = [mainMenuQuestions, employeesQuestions, roleQuestions, departmentQuestions]