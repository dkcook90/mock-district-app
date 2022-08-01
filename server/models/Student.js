//allows the use of the Model class from the sequelize library which will help us create the table
//also allows use of the DataTypes method to specify the data type
const { Model, DataTypes } = require('sequelize');
//bring in our sequelize connection from the connection.js file
const sequelize = require('../config/connection');

class Student extends Model {}

Student.init(
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
    grade: {
        type: DataTypes.STRING,
    },
    //key on the Student table that will relate a teacher to a school
    teacher_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'teacher',
            key: 'id',
        },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'student',
  }
);

module.exports = Student;