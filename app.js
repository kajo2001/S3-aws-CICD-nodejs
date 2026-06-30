const express = require('express');
const path = require('path');
var mysql=require("mysql2");
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
var con= mysql.createConnection({
  host:"mydatabase.cjmamy44e1z1.eu-north-1.rds.amazonaws.com",
  user:"admin",
  password:"Ciit#2026",
  database:"College"
});

app.get("/api/student",(req,res)=>{
  con.connect(function(err){
    if(err) throw err;
    con.query("select * from Students",(err,result)=>{
      if(err) throw err;
      return res.send(result);
    })
  })
})

app.get('/', (req, res) => {
    // res.send('Hello Express!');
    res.sendFile(__dirname + '/index.html');

    
});

app.get('/student', (req, res) => {
  con.connect(function(err){
    if(err) throw err;
    con.query("select * from Students",(err,result)=>{
      if(err) throw err;
     res.render('index', { 
            pageTitle: 'User Directory (Rendered on Server)', 
            users: result 
        });

    })
  })

    
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// var express = require("express");
// var app = express();
// var mysql = require("mysql2");

// var port = process.env.PORT || 8090;

// // Read credentials dynamically from environment variables
// var con = mysql.createConnection({
//   host: process.env.RDS_HOSTNAME,
//   user: process.env.RDS_USERNAME,
//   password: process.env.RDS_PASSWORD,
//   database: process.env.RDS_DB_NAME
// });
// app.get("/", (req, res) => {
//   res.send("Welcome to the Student Data API");
// });

// app.get("/students", (req, res) => {
 
//   con.query("SELECT * FROM students", (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Error loading data from database");
//     }

//     let html = `
//       <h2>Student Data</h2>
//       <table border="1">
//         <tr>
//           <th>Roll No</th>
//           <th>Name</th>
//           <th>English</th>
//           <th>Maths</th>
//           <th>Science</th>
//         </tr>
//     `;

//     result.forEach(student => {
//       html += `
//         <tr>
//           <td>${student.roll_no || student.Roll_No}</td>
//           <td>${student.student_name || student.Name}</td>
//           <td>${student.English}</td>
//           <td>${student.Maths}</td>
//           <td>${student.Science}</td>
//         </tr>
//       `;
//     });

//     html += "</table>";
//     return res.send(html);
//   });
// });

// app.listen(port, () => {
//   console.log("Server is running on port " + port);
// });