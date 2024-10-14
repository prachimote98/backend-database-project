const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    enrolledCourses: {
        type: String,
        enum: ['physics', 'chemistry', 'biology', 'mathematics' ],
        required: true
    },
    assignments: {
        type: String,
        required: true,
    }
})

const Student =mongoose.model('Student', StudentSchema);
module.exports = Student;