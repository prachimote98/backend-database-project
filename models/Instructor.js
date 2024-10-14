const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        required: true
    },
    courses: {
        type: String,
        enum: ['physics', 'chemistry', 'biology', 'mathematics' ],
        required: true
    },
    rating: {
        type: Number,
        required: true,
    }
})

const Instructor = mongoose.model('Instructor', InstructorSchema);
module.exports = Instructor;

