const {DataTypes} = require('sequelize');
const db = require('../db/conn');

const task = db.define('Task', {
    title: {
        type: DataTypes.STRING,
        required:true
},
  description: {
        type: DataTypes.STRING,
        required:true
},  done: {
        type: DataTypes.STRING,
        required:true
}});

module.exports = task; 