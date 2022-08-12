var db = require("pg");
const config = {
    host:"localhost",
    user:"postgres",
    password:"rootroot",
    database:"postgres",
    port:"5433"
};
var connection = new db.Client(config);
connection.connect(function(err){
    if (err) {
        console.log(err);
        return;
    }
    console.log("connection established");
})
module.exports = connection;