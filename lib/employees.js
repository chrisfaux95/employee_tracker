const connection = require("./connection");

function viewAll(){
    let qStr = "SELECT * FROM employees"
    connection.query(qStr, (err,res) => {
        if (err) console.log(err);
        console.table(res);
    })
}

function viewAllbyRole(){
    let qStr = "SELECT * FROM employees ORDER BY role_id"
    connection.query(qStr, (err,res) => {
        if (err) console.log(err);
        console.table(res);
    })
}