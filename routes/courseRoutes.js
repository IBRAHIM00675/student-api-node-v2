const express = require('express')
const routes = express.Router()
const courseController = require('../controllers/courseController')

routes.post('/addCourse', courseController.addCourse)

routes.get('/getAllCourses', courseController.getAllCourses)

routes.get('/getCourseById/:course_id', courseController.getCourseById)

routes.patch('/updateCourse/:course_id', courseController.updateCourse)

routes.delete('/deleteCourse/:course_id', courseController.deleteCourse)

module.exports= routes