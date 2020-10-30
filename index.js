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
    Allcourses = []
    for(couse of courses){
        Allcourses.push({subject: couse["subject"], className: couse['className']})
    }
    res.send(Allcourses);
});

// app.get('/api/courses/:catalog_nbr', (req, res) => {
//     console.log(`GET request from ${req.url}`);
//     Allcourses = []
//     for(couse of courses){
//         Allcourses.push([couse["subject"],couse['className']])
//     }
//     res.send(Allcourses);
// });

app.listen(port, () => {
    console.log(courses[0]);
});