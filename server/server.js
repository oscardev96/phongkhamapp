import appModulePath from 'app-module-path';
import http from 'http';
import express from 'express';
import cors from 'cors';
const mysql = require("mysql")

const Api = express();
const HTTP = http.Server(Api);

Api.use(cors());
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "phongkham"
  });
Api.get('/test', (req, res) => {
    let sql = "SELECT * FROM drug";
    con.query(sql, function(err, results) {
        if (err) {
            console.log(err)
            return
        };
       
        console.log(results)
        res.status(200).send(results)});
    });
  

HTTP.listen(9001, () => {
    console.log('listening on *:9001');
});

