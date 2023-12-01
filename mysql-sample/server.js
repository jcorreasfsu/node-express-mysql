const express = require("express");
const path = require("path");

//Require the mysql/promise module
const mysql = require("mysql2/promise");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

//Create pool using mysql.createPool({ })
    // - host
    // - user
    // - password
    // - database
    // - connectionLimit
const pool = mysql.createPool({
    host:"localhost",
    user:"student",
    password:"student",
    database:"sfsu",
    connectionLimit: 1
});


app.post("/addOrders", (req, res) =>{
    
})

app.post("/addUser", async (req, res) => {
   let firstName = req.body.firstName;
   let lastName = req.body.lastName;
   let age = req.body.age;
   let dob = req.body.dob;

let arguments = [firstName, lastName, age, dob];

   //Add code for the databse insert
   // - try/catch block
   // - create a connection to the (await)
   // - use execute function to run query (await)
   // - 'INSERT INTO Student (first_name, last_name, age, dob) VALUES (?,?,?,?)'
   // - release the connection
   // - send a response message
    try{
        const connection = await pool.getConnection();
        await connection.execute(
            'INSERT INTO Student (first_name, last_name, age, dob) VALUES (?,?,?,?)', arguments
        );
        connection.release();
        res.send("User has been added to the database!");

    }catch(e){
        res.status(500).send(e.message);
    }
   
})

app.listen(3000, function(){
    console.log("Server is running on port 3000!");
})