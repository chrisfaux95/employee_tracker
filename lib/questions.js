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
        // "View Employees By Department",
        // "View Employees By Manager",
        "Add Employee",
        "Remove Employee",
        // "Update Employee Role",
        // "Update Employee Manager",
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
        "View Departments",
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

const newEmployeeQuestions = [
    {
        name: "firstName",
        type: "input",
        message: "What is their first name?"
    },
    {
        name: "lastName",
        type: "input",
        message: "What is their last name?"
    }
]

const newRoleQuestions = [
    {
        name: "title",
        type: "input",
        message: "What is the role's title?"
    },
    {
        name: "salary",
        type: "input",
        message: "What is the salary?"
    }
]

const newDeptQuestions = [
    {
        name: "dept",
        type: "input",
        message: "What is this new Department called?"
    }
]



module.exports = {
    mainMenuQuestions: mainMenuQuestions,
    employeesQuestions: employeesQuestions,
    roleQuestions: roleQuestions, 
    departmentQuestions: departmentQuestions,
    newDeptQuestions: newDeptQuestions,
    newRoleQuestions: newRoleQuestions,
    newEmployeeQuestions: newEmployeeQuestions
};