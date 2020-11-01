var fs = require('fs');
var data = fs.readFileSync("Lab3-timetable-data.json")
var courses = JSON.parse(data)
var schdeulesData = fs.readFileSync("schedules.json")
var schedules = JSON.parse(schdeulesData)

const express = require('express');
const e = require('express');
const app = express(); 
const port = 3000
const router = express.Router();

// parse data in body as JSON
router.use(express.json());

// setup serving frontend code
app.use('/',  express.static('static'));

// get list of classes
router.get('/courses/all', (req, res) => {
    console.log(`GET request from ${req.url}`);
    const allCourses = []
    for(course of courses){
        allCourses.push({subject: course["subject"], className: course['className']})
    }
    res.send(allCourses);
});

// get courses codes by subject
router.get('/courses/:subject', (req, res) => {
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
router.get('/courses/:subject/:course_code/:course_component?', (req, res) => {
    console.log(`GET request from ${req.url}`);
    // filter course codes
    tableEntry = []
    if(!req.params.course_component){
        for(course of courses){
            if(req.params.subject === course["subject"] && req.params.course_code === course["catalog_nbr"].toString() ){
                for(component of course["course_info"]){
                    tableEntry.push(component)
                }
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

router.put('/schedule/:schedule_name', (req, res) => {
    if(schedules.find(s => s.name === req.params.schedule_name)){
        res.status(400).send('Name is already present')
        return
    }
    const newSchedule = {
        name: req.params.schedule_name,
        courses: [] 
    }
    schedules.push(newSchedule)
    var data = JSON.stringify(schedules, null, 2)
    fs.writeFile('schedules.json', data, (err) => {
        if (err) throw err;
      });
    res.send(newSchedule) 
});

router.delete('/schedule/:schedule_name', (req, res) => {
    console.log(`DELETE request from ${req.url}`);
    const schedule = schedules.find(s => s.name === req.params.schedule_name)
    if(!schedule){
        res.status(400).send('No schedules by this name')
        return
    }
    const index = schedules.indexOf(schedule)
    schedules.splice(index,1)
    var data = JSON.stringify(schedules, null, 2)
    fs.writeFile('schedules.json', data, (err) => {
        if (err) throw err;
      });

    res.send(schedule)
});

router.put('/schedule/courses', (req, res) => {
    const scheduleNum = schedules.findIndex(s => s.name === req.body.scheduleName)
    const subjectsArray = req.body.subjectNames.split(" ")
    const courseNumberArray = req.body.courseNumbers.split(" ")
    if(scheduleNum < 0){
        res.status(400).send('schedule is not present')
        return
    }
    else{
        schedules[scheduleNum].courses=[]
        for(let i=0;i<subjectsArray.length;i++){
            schedules[scheduleNum].courses.push([subjectsArray[i],courseNumberArray[i]])
        }
    }
    var data = JSON.stringify(schedules, null, 2)
    fs.writeFile('schedules.json', data, (err) => {
        if (err) throw err;
      });
    res.send(schedules[scheduleNum]) 
});

router.get('/schedule/:schedule_name', (req, res) => {
    console.log(`GET request from ${req.url}`);
    let coursesList = []
    for(schedule of schedules){
        if (req.params.schedule_name === schedule["name"]){
            coursesList = schedule["courses"]
        }
    }
    if (coursesList.length === 0){
        res.status(404).send('no schedule with that name')
    }
    res.send(coursesList)
});

app.use('/api', router);

app.listen(port, () => {
    
});