const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    courses: {
        type: String,
        enum: ['physics', 'chemistry', 'biology', 'mathematics' ],
        required: true
    },
    duration: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: Number,
        required: true,
    },
    lessons: {
        type: Number,
        required: true,
    }
})

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;


