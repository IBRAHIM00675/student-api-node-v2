const db = require("../models/indexStart")
const createError = require("http-errors")

// use the model 
const Student = db.students
const Course = db.courses

// module.exports = {

//     // add a student
//     addStudent : async(req, res, next) =>{

//         try{
//             let info = {
//                 firstname: req.body.firstname,
//                 lastname: req.body.lastname,
//                 gender: req.body.gender,
//                 course_id: req.body.course_id
//             }
//             const addStudent = await Student.create(info)
//             res.status(200).send(addStudent)
//         } catch (error) {
//             next(error)
//         }
//     }, 



//     // get all students
//     getAllStudents :async (req, res, next)=> {
//         try{
//             let students = await Student.findAll({})
//             res.status(200).send(students)


//         } catch (error) {
//             next(error)
//         }
        
//     },

//     // get student by id
//     getStudent : async(req, res, next)=>{
//         try{
//             let id = req.params.student_id
//             let student = await Student.findOne({where: {student_id: id}})

//             if (!student){
//                 throw(createError(404, "student does not exist"))
//             }
//             res.status(200).send(student)

//         } catch (error) {
//             next(error)
//         }
//     },

//     // get all students with course
//     getAllStudentwithCourse :async (req, res, next)=> {
//             try{
//                 let student = await Student.findAll({include:[{model: Course, attributes:['coursename']}]})
    
//                 res.status(200).send(student)
    
    
//             } catch (error) {
//                 next(error)
//             }
            
//         },


//     // get one student with course
//     getOneStudentWithCourse: async (req, res, next)=>{
//             try{
//                 const id = req.params.student_id
//                 const student = await Student.findAll({include:[{model: Course, attributes:['coursename']}], where: {student_id: id}})
//                 res.status(200).send(student)
//             }
//             catch(error){
//                 next(error)
//             }
//         },
        

//     // update Student
//     updateStudent :async(req, res, next)=>{
//         try{
//             let id = req.params.student_id

//             const student = await Student.update(req.body, {where: {student_id: id}})
//             if(!student){
//                 throw(createError(404, "student does not exist"))
//             }
//             res.status(200).send(`${student} updated succesfully`)
//         } catch (error) {
//             next(error)
//         }
//     },

//     // delete student
//     deleteStudent : async(req, res, next)=>{
//         try{
//             let id = req.params.student_id

//             await Student.destroy({where: {student_id: id}})
//             res.status(200).send("student Deleted Succesfully")

//         } catch (error) {
//             next(error)
//         }
//     }
// }

module.exports ={
    addStudent: async (req, res, next) => {
    try {
        const { firstname, lastname, gender, course_id } = req.body;

        // Validate course existence
        const course = await Course.findByPk(course_id);
        if (!course) {
            throw createError(400, "Invalid course_id. Course does not exist.");
        }

        const newStudent = await Student.create({ firstname, lastname, gender, course_id });

        res.status(201).send(newStudent);
    } catch (error) {
        next(error);
    }
},

getAllStudents: async (req, res, next) => {
    try {
        const students = await Student.findAll({
            include: {
                model: Course,
                as: "course", // Use the alias defined in the association
                attributes: ["coursename"], // Fetch only the coursename
            },
        });

        res.status(200).send(students);
    } catch (error) {
        next(error);
    }
},

getStudent: async (req, res, next) => {
    try {
        const { student_id } = req.params;

        const student = await Student.findOne({
            where: { student_id },
            include: {
                model: Course,
                as: "course",
                attributes: ["coursename"],
            },
        });

        if (!student) {
            throw createError(404, "Student does not exist");
        }

        res.status(200).send(student);
    } catch (error) {
        next(error);
    }
},

getAllStudentwithCourse: async (req, res, next) => {
    try {
        const students = await Student.findAll({
            include: {
                model: Course,
                as: "course",
                attributes: ["coursename"],
            },
        });

        res.status(200).send(students);
    } catch (error) {
        next(error);
    }
},
getOneStudentWithCourse: async (req, res, next) => {
    try {
        const { student_id } = req.params;

        const student = await Student.findOne({
            where: { student_id },
            include: {
                model: Course,
                as: "course",
                attributes: ["coursename"],
            },
        });

        if (!student) {
            throw createError(404, "Student does not exist");
        }

        res.status(200).send(student);
    } catch (error) {
        next(error);
    }
},

updateStudent: async (req, res, next) => {
    try {
        const { student_id } = req.params;

        const student = await Student.findOne({ where: { student_id } });
        if (!student) {
            throw createError(404, "Student does not exist");
        }

        await student.update(req.body);

        res.status(200).send(`Student ${student_id} updated successfully`);
    } catch (error) {
        next(error);
    }
},

deleteStudent: async (req, res, next) => {
    try {
        const { student_id } = req.params;

        const student = await Student.findOne({ where: { student_id } });
        if (!student) {
            throw createError(404, "Student does not exist");
        }

        await student.destroy();

        res.status(200).send("Student deleted successfully");
    } catch (error) {
        next(error);
    }
},











}