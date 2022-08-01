//allows the use of the Model class from the sequelize library which will help us create the table
//also allows use of the DataTypes method to specify the data type
const { Model, DataTypes } = require('sequelize');
//bring in our sequelize connection from the connection.js file
const sequelize = require('../config/connection');

class School extends Model {}

School.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    principal: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    budget: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'school',
  }
);

module.exports = School;
