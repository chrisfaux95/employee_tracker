// IMPORTING INQUIRER
const inquirer = require("inquirer");
// IMPORTING QUESTIONS
const { mainMenuQuestions,
    employeesQuestions,
    roleQuestions,
    departmentQuestions,
    newDeptQuestions,
    newRoleQuestions,
    newEmployeeQuestions } = require("./lib/questions");
// IMPORTING MYSQL CONNECTION
const connection = require("./lib/connection");

function mainMenu() {
    console.log("\n")
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
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            case "Return":
            default:
                mainMenu();
                break;
        }
    })
}

function manageRoles() {
    inquirer.prompt(roleQuestions).then(res => {
        // console.log(res.role);
        switch (res.role) {
            case "View All Roles":
                viewRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "Remove Role":
                removeRole();
            case "Update Role Title":
                updateRoleTitle();
                break;
            case "Update Role Salary":
                updateRoleSalary();
                break;
            case "Return":
            default:
                mainMenu();
                break;
        }
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
            case "Update Department Name":
                updateDeptName();
                break;
            case "Return":
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

function viewAllEmployeesByDept() {
    let qStr = "SELECT employees.first_name, employees.last_name, roles.title FROM employees, roles ORDER BY role_id";
    manageEmployees();
}

function addNewEmployee() {
    let qStr = "SELECT first_name, last_name FROM employees ORDER BY id";
    connection.query(qStr, (err, res) => {
        if (err) console.log(err);
        let managerChoices = res.map(e => e.last_name + ", " + e.first_name);
        let qStr = "SELECT title FROM roles ORDER BY id"
        connection.query(qStr, (err, res) => {
            if (err) console.log(err);
            let roleChoices = res.map(e => e.title);
            inquirer.prompt([...newEmployeeQuestions,
                {
                    name: "role",
                    type: "list",
                    message: "Which employee would you like to update?",
                    choices: roleChoices,
                    filter: (val) => {return roleChoices.indexOf(val) + 1}
                },
                {
                    name: "manager",
                    type: "list",
                    message: "What is their new role?",
                    choices: ["N/A" , ...managerChoices],
                    filter: (val) => {return managerChoices.indexOf(val)}
                }
            ]).then((ans) => {
                let qStr = "INSERT INTO employees (first_name, last_name, role_id) VALUE (?, ?, ?)";
                let qArr = [ans.first_name, ans.last_name, ans.role];
                if (ans.manager > 0) {
                    qStr = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)";
                    qArr = [...qArr, ans.manager]
                }
                connection.query(qStr, qArr, (err, res) => {
                    if (err) console.log(err);
                    console.log(res);
                    console.log("Added " + ans.first_name + " " + ans.last_name);
                    manageEmployees()
                })
            })
        })
    })
}

function removeEmployee() {
    let qStr = "SELECT first_name, last_name FROM employees";
    connection.query(qStr, (err, res) => {
        if (err) throw err;
        let choices = res.map(e => e.last_name + ", " + e.first_name);
        inquirer.prompt({
            name: "employee",
            type: "list",
            message: "Which Employee Would You Like To Remove?",
            choices: choices
        }).then((ans) => {
            let [last, first] = ans.employee.split(", ");
            let qStr = "DELETE FROM employees WHERE first_name=? AND last_name = ?";
            connection.query(qStr, [first, last], (err, res) => {
                if (err) console.log(err);
                console.log(res);
                console.log("Deleted " + ans.employee);
                manageEmployees()
            })
        })
    })
}

function updateEmployeeRole() {
    let qStr = "SELECT first_name, last_name FROM employees";
    connection.query(qStr, (err, res) => {
        if (err) throw err;
        let employeeChoices = res.map(e => e.last_name + ", " + e.first_name);
        let qStr = "SELECT title FROM roles ORDER BY id"
        connection.query(qStr, (err, res) => {
            if (err) console.log(err);
            let roleChoices = res.map(e => e.title);
            inquirer.prompt([
                {
                    name: "employee",
                    type: "list",
                    message: "Which employee would you like to update?",
                    choices: employeeChoices
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is their new role?",
                    choices: roleChoices,
                    filter: (val) => {return roleChoices.indexOf(val) + 1}
                }
            ]).then((ans) => {
                let role = ans.role
                let [last, first] = ans.employee.split(", ");
                let qStr = "UPDATE employees SET role_id=? WHERE first_name=? AND last_name = ?";
                connection.query(qStr, [role, first, last], (err, res) => {
                    if (err) console.log(err);
                    // console.log(res);
                    console.log("Updated " + ans.employee);
                    manageEmployees();
                })
            })
        })
    })
}

function updateEmployeeManager() {
    let qStr = "SELECT first_name, last_name FROM employees ORDER BY id";
    connection.query(qStr, (err, res) => {
        if (err) throw err;
        let employeeChoices = res.map(e => e.last_name + ", " + e.first_name);
        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "Which employee would you like to update?",
                choices: employeeChoices,
                filter: (val) => {return employeeChoices.indexOf(val) + 1}
            },
            {
                name: "manager",
                type: "list",
                message: "Who is their new manager?",
                choices: employeeChoices,
                filter: (val) => {return employeeChoices.indexOf(val) + 1}
            }
        ]).then((ans) => {
            let qStr = "UPDATE employees SET manager_id=? WHERE id=?";
            connection.query(qStr, [manager, employee], (err, res) => {
                if (err) console.log(err);
                console.log(res);
                console.log("Updated " + ans.employee);
                manageEmployees()
            })
        })
    })
}



///////////////////////////
// DEPARTMENT FUNCTIONS  //
/////////////////////////// 

function addDepartment() {
    inquirer.prompt(newDeptQuestions).then((answer) => {
        let qStr = "INSERT INTO departments (name) VALUE (?)";
        connection.query(qStr, answer.dept, (err, res) => {
            if (err) console.log(err);
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
        // console.log(res);
        // console.log("--------\n")
        console.table(res);
        manageDepartments();
    })
}

function removeDepartment() {
    let qStr = "SELECT name FROM departments";
    connection.query(qStr, (err, res) => {
        if (err) console.log(err);
        let choices = res.map(e => e.name)
        inquirer.prompt({
            name: "dept",
            type: "list",
            message: "Which Department would you like to remove?",
            choices: choices
        }).then((ans) => {
            let qStr = "DELETE FROM departments WHERE name=?";
            connection.query(qStr, ans.dept, (err, res) => {
                if (err) console.log(err);
                console.log(res);
                console.log("Deleted " + ans.dept);
                manageDepartments()
            })
        })
    })
}

function updateDeptName() {
    let qStr = "SELECT name FROM departments";
    connection.query(qStr, (err, res) => {
        if (err) console.log(err);
        let choices = res.map(e => e.name)
        inquirer.prompt([
            {
                name: "dept",
                type: "list",
                message: "Which Department would you like to update?",
                choices: choices
            },
            {
                name: "name",
                type: "input",
                message: "What would you like to change it to?"
            }
        ]).then((ans) => {
            let qStr = "UPDATE departments SET name=? WHERE name=?";
            connection.query(qStr, [ans.dept, ans.dept], (err, res) => {
                if (err) console.log(err);
                console.log(res);
                console.log("Deleted " + ans.dept);
                manageDepartments()
            })
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
        console.log("\n");
        console.table(res);
        console.log("\n");
        manageRoles();
    })
}

function addRole() {
    inquirer.prompt([
        ...newRoleQuestions,
        {
            name: "department_id",
            type: "input",
            message: "What is the id of the Department it is in?"
        }
    ]).then((ans) => {
        let qStr = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
        connection.query(qStr, [ans.title, ans.salary, ans.department_id], (err, res) => {
            if (err) console.log(err);
            // console.table(res);
            console.log("Created New Role!")
            manageRoles();
        })
    })
}

function updateRoleTitle() {
    let qStr = "SELECT title FROM roles";
    connection.query(qStr, (err, res) => {
        if (err) console.log(err);
        let roles = res.map(e => e.title);
        inquirer.prompt([{
            name: "role",
            type: "list",
            message: "Which Role would you like to update?",
            choices: roles
        },
        {
            name: "title",
            type: "input",
            message: "What are you changing its title to?"
        }
        ]).then((ans) => {
            let qStr = "UPDATE roles SET title=? WHERE title=?";
            connection.query(qStr, [ans.title, ans.title], (err, res) => {
                if (err) console.log(err);
                console.log(res);
                console.log("Updated " + ans.role);
                manageRoles();
            })
        })
    })
}


function updateRoleSalary() {
    let qStr = "SELECT title FROM roles";
    connection.query(qStr, (err, res) => {
        if (err) console.log(err);
        let roles = res.map(e => e.title);
        inquirer.prompt([{
            name: "role",
            type: "list",
            message: "Which Role would you like to update?",
            choices: roles
        },
        {
            name: "salary",
            type: "input",
            message: "What Are You Changing its salary to?",
            validate: validateSalary
        }
        ]).then((ans) => {
            let qStr = "UPDATE roles SET salary=? WHERE title=?";
            connection.query(qStr, [ans.salary, ans.title], (err, res) => {
                if (err) console.log(err);
                console.log(res);
                console.log("Updated " + ans.role);
                manageRoles();
            })
        })
    })
}

function removeRole() {
    let qStr = "SELECT title FROM roles";
    connection.query(qStr, (err, res) => {
        if (err) console.log(err);
        let roles = res.map(e => e.title);
        inquirer.prompt({
            name: "role",
            type: "list",
            message: "Which Role would you like to remove?",
            choices: roles
        }).then((ans) => {
            let qStr = "DELETE FROM roles WHERE title=?";
            connection.query(qStr, ans.role, (err, res) => {
                if (err) console.log(err);
                console.log(res);
                console.log("Deleted " + ans.role);
                manageRoles();
            })
        })
    })
}

/////////////////////
// MISC  FUNCTIONS //
/////////////////////

function validateSalary(salary) {
    if (!isNan(salary.toFloat())) {
        return true;
    } else {
        return "Please put in a valid number"
    }
}




mainMenu()