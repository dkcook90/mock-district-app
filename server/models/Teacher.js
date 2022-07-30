const { Model, DataTypes } = require('sequelize');
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
