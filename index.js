var fs = require('fs');
var data = fs.readFileSync("Lab3-timetable-data.json")
var courses = JSON.parse(data)

const express = require('express');
const app = express(); 
const port = 3000

// setup serving frontend code
app.use('/',express.static('static'));

// get list of classes
app.get('/api/courses/all', (req, res) => {
    console.log(`GET request from ${req.url}`);
    const allCourses = []
    for(course of courses){
        allCourses.push({subject: course["subject"], className: course['className']})
    }
    res.send(allCourses);
});

// get courses codes by subject
app.get('/api/courses/:subject', (req, res) => {
    console.log(`GET request from ${req.url}`);
    // filter course codes
    course_codes = []
    for(course of courses){
        if(req.params.subject === course["subject"]){
            course_codes.push(course["catalog_nbr"].toString())
        }
    }
    if (course_codes.length === 0){
        res.status(404).send('subject was not found')
    }
    res.send(course_codes)
});

// get time table entry by subject, course code and component
app.get('/api/courses/:subject/:course_code/:course_component?', (req, res) => {
    console.log(`GET request from ${req.url}`);
    // filter course codes
    tableEntry = []
    if(!req.params.course_component){

        for(course of courses){
            if(req.params.subject === course["subject"] && req.params.course_code === course["catalog_nbr"].toString() ){
                tableEntry.push(course["course_info"])
            }
        }
    }
    else{
        for(course of courses){
            if(req.params.subject === course["subject"] && req.params.course_code === course["catalog_nbr"].toString()){
                for(component of course["course_info"]){
                    if (req.params.course_component === component["ssr_component"])
                        tableEntry.push(component)
                }
            }
        }
    }
    if (tableEntry.length === 0){
        return res.status(404).send('the course code or subject does not exist')
    }
    res.send(tableEntry)
});

app.listen(port, () => {
    console.log(courses[0]);
});