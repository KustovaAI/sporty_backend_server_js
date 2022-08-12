var express = require("express");
var app = express();
var connection = require("./db");
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/autorization",function(req,res){
    console.log("POST /autorization called");
    connection.query("select user_login from my_users where user_login = $1",[req.body.user_login], function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        if (rows != '') {
            connection.query("select password from my_users where user_login = $1 and password = $2", [req.body.user_login, req.body.password], function (err, rows) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (rows != '') {
                    res.end(JSON.stringify(req.body.user_login));
                    console.log("ok");
                } else {
                    res.end(JSON.stringify("incorrect password"));
                }

            });
        } else {
            res.end(JSON.stringify("no such user"));
        }
    });

});
app.get("/all_users",function(req,res){
    console.log("GET /all_users called");
    connection.query("select * from my_users",[], function(err, rows){
        if (err){
            console.log(err);
            return;
        }
        res.end(JSON.stringify(rows.rows));
    });

});


app.listen(3002);