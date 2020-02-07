const mysql = require("mysql");
// for server configuration
let pool = mysql.createPool({
  connectionLimit: 100,
  waitForConnections: true,
  queueLimit: 0,
  host: "127.0.0.1",
  user: "SpeedUser",
  password: "el!365X!@",
  database: "dev_controltower",
  debug: true,
  wait_timeout: 28800,
  connect_timeout: 10
});

// for local configuration
// let pool = mysql.createPool({
//   connectionLimit: 100,
//   waitForConnections: true,
//   queueLimit: 0,
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "dev_controltower",
//   debug: true,
//   wait_timeout: 28800,
//   connect_timeout: 10
// });

// var pool = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "dev_controltower"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

module.exports = {
  pool
};
