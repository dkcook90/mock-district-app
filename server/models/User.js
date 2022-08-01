//allows the use of the Model class from the sequelize library which will help us create the table
//also allows use of the DataTypes method to specify the data type
const { Model, DataTypes } = require('sequelize');
//password hashing library for our users passwords
const bcrypt = require('bcrypt');
//bring in our sequelize connection from the connection.js file
const sequelize = require('../config/connection');

class User extends Model {
  //method I put on the user model to allow bcrypt to compare the password that was input by the user with the password stored in the database
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    //these hooks allow bcrypt to hash the password input by the user upon creating and updating their account/profile
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
