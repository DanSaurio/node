
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"pos"
});

con.connect(); 
    con.query("SELECT * FROM productos", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    })