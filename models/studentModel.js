module.exports= (sequelize, DataTypes) =>{


  const Student = sequelize.define("student",{
      student_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      firstname:{
          type: DataTypes.STRING,
          allowNull: false
      },
      lastname:{
          type: DataTypes.STRING,
          allowNull: false
      },
      gender:{
          type: DataTypes.STRING,
          allowNull: true
      },
      course_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "Courses", // Must match the name of your Course table
            key: "course_id"
        },
      }
  });

  return Student

}