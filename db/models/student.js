const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student',{
    firstName:
    {
        type: Sequelize.STRING
    },
    lastName:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    email:
    {
        type:Sequelize.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        }
    }
});

//create a before create hook
Student.beforeCreate(user =>{
    let arr = user.firstName.split('')
    arr[0] = arr[0].toUpperCase
    user.firstNam = arr.join('')
})

module.exports = Student;
