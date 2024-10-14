require('dotenv').config();

const express = require('express');
const app = express();

const Instructor = require('./models/Instructor')
const Student = require('./models/Student')
const Course = require('./models/Course')
const db = require('./db')
const passport = require('./auth')



const PORT = process.env.PORT || 9000

app.use(passport.initialize());
const localauthmiddleware = passport.authenticate('local', {session: false})


const bodyParser = require('body-parser');

app.use(bodyParser.json());


// middleware

const login = (req, res, next) =>{
        const currentDate = new Date();
        console.log(currentDate.toDateString());
            next()
}


app.get('/', login,  function (req, res) {
    res.send("new course enrollement")
})

app.post('/enrolledCourses', async (req, res) => {
    try {
        const data = req.body;
        const newStudent = new Student(data);
        const response = await newStudent.save();
        console.log("Data saved");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/enrolledCourses',  async (req, res) => {
    try {
        const data = await Student.find();
        console.log("Data fetched");
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.get('/enrolledCourses/:enrolledCoursesType', async (req, res) => {
    try {
        const enrolledCoursesType = req.params.enrolledCoursesType;

        if (enrolledCoursesType == 'physics' || enrolledCoursesType == 'chemistry' || enrolledCoursesType == 'biology' || enrolledCoursesType == 'mathematics') {
            const response = await Student.find({ enrolledCourses: enrolledCoursesType })
            console.log("response fetched")
            res.status(200).json(response);
        }

        else {
            res.status(400).json({ error: "invalid course type" })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }

    
    })



    app.listen(PORT, () => {
        console.log('server  run at 9000')
    
    })



app.put('/:id',async (req, res)=>{
    try{

        const StudentId = req.params.id;
        const updatedStudentData = req.body;

        const response = await Student.findByIdAndUpdate(StudentId, updatedStudentData, {
            new: true, // Return the updated document
            runValidators: true // Run Mongoose validation
        })


        if(!response)
        {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(response);


    }
    
    catch(err){
        console.log(err);
       res.status(500).json({ error: "Internal server error" });
    }
} )

app.delete('/:id', async(req,res)=>{
    try{
        const StudentId=req.params.id;
        const DeleteStudentData=req.body;

        const response= await Student.findByIdAndDelete(StudentId,DeleteStudentData,{
            new:true,    //return the updated document
            runValidators:true    //run mongoose validator
        })

        if(!response){
            return res.status(404).json({error:"course not found"});
        }
        res.status(200).json({message:'courses deleted successfully'})

    }
    catch(err){
               console.log(err);
               res.status(500).json({error:"Internal server error"})
            }

})



