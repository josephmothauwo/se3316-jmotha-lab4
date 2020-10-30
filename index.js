var fs = require('fs');
var data = fs.readFileSync("Lab3-timetable-data.json")
var courses = JSON.parse(data)

const express = require('express');
const app = express(); 
const port = 3000

// setup serving frontend code
app.use('/',express.static('static'));

// get list of classes
app.get('/api/courses', (req, res) => {
    console.log(`GET request from ${req.url}`);
    res.send(courses);
});

app.get('/api/courses/all', (req, res) => {
    console.log(`GET request from ${req.url}`);
    const allCourses = []
    for(course of courses){
        allCourses.push({subject: course["subject"], className: course['className']})
    }
    res.send(allCourses);
});

app.get('/api/courses/:subject', (req, res) => {
    console.log(`GET request from ${req.url}`);
    // const course_codes = courses.find(c => c.subject === req.params.subject);
    course_codes = []
    for(course of courses){
        if(req.params.subject === course["subject"]){
            course_codes.push(course["catalog_nbr"].toString())
        }
    }
    if (!course_codes){
        res.status(404).send('subject was not found')
    }
    res.send(course_codes)
});

app.listen(port, () => {
    console.log(courses[0]);
});