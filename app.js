const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'class_practice'
    });

app.get('/users',(req,res) =>{
    pool.getConnection((err, connection) => {
        if (err)
          throw err;
        const selectUser = 'SELECT * FROM users';

        connection.query(selectUser,(error, rows) => {
            connection.release();

            if(!error){
                res.json({
                    status: 'ok',
                    success: true,
                    data: rows
                });
            }else{
                console.log(error);
            }
        });
    });
    
});

app.get('/user/:id', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err)
        throw err;
      const sqlQuery = 'SELECT * FROM users WHERE id = ?';
      connection.query(sqlQuery, [req.params.id], (err, rows) => {
        connection.release();
        if (!err) {
          res.json({
            data: rows[0],
            status: 200,
            message: 'Your request has been successfully!'
          });
        } else {
          console.log(err);
        }
      });
    })
   });

   app.put('/user/:id', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err)
        throw err;

      const sqlQuery = 'UPDATE users SET first_name = ?, last_name = ?, gender = ?, phone = ? WHERE id = ?';
      const { last_name,first_name, gender, phone } = req.body;
      const { id } = req.params;

      connection.query(sqlQuery, [first_name, last_name, gender, phone, id], (err, rows) => {
        connection.release
        if(!err) {
          res.json({
            status: 200,
            message: 'User record has been updated!'
          });
        } else {
          console.log(err);
        }
      })
    })
   })
  
   

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('App running on port 3000!');
});