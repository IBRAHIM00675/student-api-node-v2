const db = require("../models/indexStart")
const createError = require("http-errors")

// use the model 
const Student = db.students
const Course = db.courses

module.exports = {

    // add a student
    addStudent : async(req, res, next) =>{

        try{
            let info = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                gender: req.body.gender,
                course_id: req.body.course_id
            }
            const addStudent = await Student.create(info)
            res.status(200).send(addStudent)
        } catch (error) {
            next(error)
        }
    }, 



    // get all students
    getAllStudents :async (req, res, next)=> {
        try{
            let students = await Student.findAll({})
            res.status(200).send(students)


        } catch (error) {
            next(error)
        }
        
    },

    // get student by id
    getStudent : async(req, res, next)=>{
        try{
            let id = req.params.student_id
            let student = await Student.findOne({where: {student_id: id}})

            if (!student){
                throw(createError(404, "student does not exist"))
            }
            res.status(200).send(student)

        } catch (error) {
            next(error)
        }
    },

    // get all students with course
    getAllStudentwithCourse :async (req, res, next)=> {
            try{
                let student = await Student.findAll({include:[{model: Course, attributes:['coursename']}]})
    
                res.status(200).send(student)
    
    
            } catch (error) {
                next(error)
            }
            
        },


    // get one student with course
    getOneStudentWithCourse: async (req, res, next)=>{
            try{
                const id = req.params.student_id
                const student = await Student.findAll({include:[{model: Course, attributes:['coursename']}], where: {student_id: id}})
                res.status(200).send(student)
            }
            catch(error){
                next(error)
            }
        },
        

    // update Student
    updateStudent :async(req, res, next)=>{
        try{
            let id = req.params.student_id

            const student = await Student.update(req.body, {where: {student_id: id}})
            if(!student){
                throw(createError(404, "student does not exist"))
            }
            res.status(200).send(`${student} updated succesfully`)
        } catch (error) {
            next(error)
        }
    },

    // delete student
    deleteStudent : async(req, res, next)=>{
        try{
            let id = req.params.student_id

            await Student.destroy({where: {student_id: id}})
            res.status(200).send("student Deleted Succesfully")

        } catch (error) {
            next(error)
        }
    }
}