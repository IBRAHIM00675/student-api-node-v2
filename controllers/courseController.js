const db = require('../models/indexStart')
const createError = require('http-errors')

const Course = db.courses

module.exports = {

    // add a student
    addCourse: async(req, res, next) =>{
        try{
            const info = {
                coursename: req.body.coursename
            }

            if(!['Certificate Software Development', 'Diploma Software Development', 
                'Certificate Cyber Security', 'Diploma Cyber Security'].includes(info.coursename)){
                    throw(createError(400), 'invalid coursename value')
                }

            const course = await Course.create(info)
            res.status(200).send(course)
        }
        catch(error){
            next(error)
        }
    },
    // get all courses
    getAllCourses: async (req, res, next) => {
        try{
            const course = await Course.findAll({})
            res.status(200).send(course)
        }
        catch(error){
            next(error)
        }
    },
    // get course by id 
    getCourseById: async (req, res, next) =>{
        try{
            const id = req.params.course_id
            const course = await Course.findOne({where: {course_id: id}})
            if(!course){
                throw(createError(404), 'Course Not Found')
            }
            res.status(200).send(course)
        }
        catch(error){
            next(error)
        }
    },
    // update a course
    updateCourse: async (req, res, next) => {
        try{
            const id = req.params.course_id
            const updatedInfo = {
                coursename: req.body.coursename
            }

            if(!['Certificate Software Development', 'Diploma Software Development', 
                'Certificate Cyber Security', 'Diploma Cyber Security'].includes(updatedInfo)){
                    throw(createError(400), 'invalid coursename value')
                }

            const course = await Course.update(updatedInfo, {where: {course_id: id}})

            res.status(200).send(`course with id ${id} has been updated`)
        }
        catch(error){
            next(error)
        }
    },
    // delete a course
    deleteCourse: async (req, res, next) => {
        try{
            const id = req.params.course_id
            const course = await Course.destroy({where: {course_id: id}}) 
            res.status(200).send(`course with id ${id} has been deleted`)
        }
        catch(error){
            next(error)
        }
    }


}