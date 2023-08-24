var mysql = require('mysql');
const { text } = require('stream/consumers');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"pos"
});

function reporte(){
  con.connect(); 
    con.query("SELECT * FROM productos", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    })
}

console.log('test')
await reporte();
process.exit();