const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    'host' : 'localhost',
    'user' : 'root',
    'password' : 'password',
    'database' : 'UberEatsDB'
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.post("/api/login", (req, res)=>{
    const email_id = req.body.emailId;
    const password = req.body.password;
    const sqlLogin = "SELECT * FROM Customers WHERE email_id = ? AND password = ?"

    db.query(sqlLogin, [email_id, password], (err, result) => {
        console.log(result);
    })
})


/*app.get('/', (req, res) => {
    const sqlGet = "SELECT * FROM Customers;";
    db.query(sqlGet, (err, result) => {
        res.send("Customers Fetched...!")
    });

})*/

app.listen(5000, () => {
    console.log("Running on port 5000");
})