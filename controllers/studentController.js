const db = require("../models/indexStart")
const createError = require("http-errors")

// use the model 
const Student = db.students
const Course = db.courses



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