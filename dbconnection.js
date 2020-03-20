var mysql = require('mysql');
var dotenv = require("dotenv");
dotenv.config();

var db = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER_DB,
    password : process.env.PASS_DB,
    database : process.env.DATABASE
  });
  
db.connect();
const createUsersTable = `CREATE TABLE if not exists \`users\` (
	\`id\` INT NOT NULL  AUTO_INCREMENT UNIQUE,
	\`nick\` VARCHAR(24) NOT NULL UNIQUE,
	\`nombres\` VARCHAR(24) NOT NULL,
	\`apellidos\` VARCHAR(24) NOT NULL,
	\`password\` VARCHAR(24) NOT NULL,
	\`rol\` VARCHAR(24) NOT NULL,
	\`correo\` VARCHAR(24) NOT NULL
)
COLLATE='utf8_general_ci'
`;  
db.query(createUsersTable, function (error, results, fields) {
  if (error) throw error;
  console.log('table created: ', results);
});

module.exports = db
  