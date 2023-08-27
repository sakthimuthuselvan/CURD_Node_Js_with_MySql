const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2');

const app = express()
app.use(bodyparser.json())

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sakthimsd531@',
  database: 'my_database'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/getdata', (req, res) => {
  const sqlQuery = 'SELECT * FROM table1'

  connection.query(sqlQuery, (err, response) => {
    if (err) {
      res.send(500).json({ message: "Internal Sever Error" })
    } else {
      res.send(response)
    }
  })
})

app.post('/data', (req, res) => {
  const { name, age, email, user_password } = req.body;

  const sqlQuery = 'INSERT INTO table1 (name,age,email,user_password) VALUES(?,?,?,?)';
  const values = [name, age, email, user_password]
  connection.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Data inserted successfully' });
  });
});

app.put('/update/:id', (req, res) => {
  const id = req.params.id; // Extract id from req.params
  const { name, age, email, user_password } = req.body;
  console.log(req.body);
  const sqlQuery = 'UPDATE table1 SET name = ?, age = ?, email = ?, user_password = ? WHERE id = ?'; // Removed comma after user_password = ?

  const values = [name, age, email, user_password, id]; // Add id to values array

  connection.query(sqlQuery, values, (err, response) => {
    if (err) {
      res.status(500).json({ message: "Internal server Error" });
    } else {
      res.json({ message: "Update Successfully" });
    }
  });
});


app.delete('/data/delete/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'DELETE FROM table1 WHERE id = ?';
  connection.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Data deleted successfully' });
  });
});



app.listen(3000, () => {
  console.log("running this port at", 3000)
})