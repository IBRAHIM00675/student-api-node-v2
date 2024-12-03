
//   const { DataTypes } = require("sequelize");
// const { sequelize } = require("./indexStart");

module.exports= (sequelize, DataTypes) =>{


    const Course = sequelize.define("course",{
        course_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        coursename: {
            type: DataTypes.ENUM(
                'Certificate Software Development',
             'Diploma Software Development', 
             'Certificate Cyber Security',
             'Diploma Cyber Security'
            ),
            allowNull: false,
        },
       

    });

    return Course

}