const express = require("express");
const router = express.Router()
const studentController = require("../controllers/studentController");
const { verifyAccessToken, restrict } = require("../helpers/jwtHelper");

    
router.post('/addStudent', studentController.addStudent);

router.get('/getAllStudents', verifyAccessToken, restrict("admin","user"), studentController.getAllStudents);
router.get('/getStudent/:student_id', verifyAccessToken, restrict("admin","user"), studentController.getStudent);
// router.get('/getAllStudentwithCourse', studentController.getAllStudentwithCourse);
// router.get('/getoneStudentwithCourse/:student_id', studentController.getOneStudentWithCourse);

router.patch('/updateStudent/:student_id', verifyAccessToken, restrict("admin"),studentController.updateStudent);

router.delete('/deleteStudent/:student_id', verifyAccessToken, restrict("admin"), studentController.deleteStudent);


module.exports = router