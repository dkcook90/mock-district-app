//bring in sequelize library to connect to database
const Sequelize = require('sequelize');
//bring in the dovenv library to help keep sensitive information secret
require('dotenv').config();

//declaring the sequelize variable  for use in the conditional statement
let sequelize;

//if the connection is using JAWSDB use the .env file from JAWS, this is for the deployed version
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  //if the app is running on local host, use the variables in the provided .env file
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;