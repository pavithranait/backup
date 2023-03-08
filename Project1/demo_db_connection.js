var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: 'root',
    password: '',
    database: "mydb1"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO users (firstname, lastname, email, password) VALUES ?";
  var values = [
    ['John', 'Highway 71', 'john@123', '12345'],
    ['Peter', 'Lowstreet 4', 'john@123', '12345'],
    ['Amy', 'Apple st 652', 'john@123', '12345'],
    ['Hannah', 'Mountain 21', 'john@123', '12345'],
    ['Michael', 'Valley 345', 'john@123', '12345'],
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});