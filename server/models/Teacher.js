//allows the use of the Model class from the sequelize library which will help us create the table
//also allows use of the DataTypes method to specify the data type
const { Model, DataTypes } = require('sequelize');
//bring in our sequelize connection from the connection.js file
const sequelize = require('../config/connection');

class Teacher extends Model {}

Teacher.init(
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
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    //key on the Teacher table that will relate a school to a school
    school_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'school',
            key: 'id',
        },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'teacher',
  }
);

module.exports = Teacher;
