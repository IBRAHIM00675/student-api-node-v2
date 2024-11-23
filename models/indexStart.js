const dbConfig = require('../config/dbConfig.js');
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false
    }
)

sequelize.authenticate()
.then(()=>{
    console.log("Database connection successfully");
})
.catch((err)=> {
    console.log("Error" + err);
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.students = require('./studentModel.js') (sequelize, DataTypes)
db.courses = require('./courseModel.js') (sequelize, DataTypes)
db.users = require("./authModel.js") (sequelize, DataTypes)




db.sequelize.sync({force: false})
.then(() =>{
    console.log("Re-sync done");   
})


// db.courses.hasOne(db.students)
db.students.belongsTo(db.courses, { foreignKey: "course_id"});

module.exports = db




