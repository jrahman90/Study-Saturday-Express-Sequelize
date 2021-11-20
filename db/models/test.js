const Sequelize = require('sequelize');
const db = require('../db');
const Student = require('./student');

//define model
const Test = db.define('test',{
    subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      grade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
});
//associate test to the student
Test.belongsTo(Student)
module.exports = Test;
