var fs = require('fs');
var data = fs.readFileSync("Lab3-timetable-data.json")
var courses = JSON.parse(data)
var schdeulesData = fs.readFileSync("schedules.json")
var schedules = JSON.parse(schdeulesData)

const express = require('express');
const app = express(); 
const port = 3000
const router = express.Router();


app.listen(port, () => {
    console.log(`listening on port ${port}`)
});


// parse data in body as JSON
router.use(express.json());

// setup serving frontend code
app.use('/',  express.static('static'));

// get list of classes
router.get('/all_courses', (req, res) => {
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
    if(validate(req.params.subject)){
        res.status(404).send('subject was not found or invalid input')
    }
    // filter course codes
    const subject = strip(req.params.subject)
    course_codes = []
    for(course of courses){
        if(subject === course["subject"]){
            course_codes.push(course["catalog_nbr"].toString())
        }
    }
    if (course_codes.length === 0){
        res.status(404).send('subject was not found or invalid input')
    }
    res.send(course_codes)
});

// get time table entry by subject, course code and component
router.get('/courses/:subject/:course_code/:course_component?', (req, res) => {
    console.log(`GET request from ${req.url}`);
    if(validate(req.params.subject) ||validate(req.params.course_code)){
        res.status(404).send('invalid input')
    }
    // filter course codes
    const subject = strip(req.params.subject)
    const course_code = strip(req.params.course_code)
    // 2 different cases if the coursecomponent is given 
    tableEntry = []
    if(!req.params.course_component){
        for(course of courses){
            if(subject === course["subject"] && course_code === course["catalog_nbr"].toString() ){
                for(component of course["course_info"]){
                    tableEntry.push(component)
                }
            }
        }
    }
    
    else{
        if(validate(req.params.course_component)){
            res.status(404).send('invalid input')
        }
        const course_component = strip(req.params.course_component)
        for(course of courses){
            if(subject === course["subject"] && course_code === course["catalog_nbr"].toString()){
                for(component of course["course_info"]){
                    if (course_component === component["ssr_component"])
                        tableEntry.push(component)
                }
            }
        }
    }
    if (tableEntry.length === 0 ){
        return res.status(404).send('the course code or subject does not exist')
    }
    res.send(tableEntry)
});

// add a new schdeule to the schdeules json file
router.put('/schedules/:schedule_name', (req, res) => {
    if(schedules.find(s => s.name.toUpperCase() === req.params.schedule_name.toUpperCase()) || validate(req.params.schedule_name)){
        res.status(400).send('Name is already present or invalid name')
        return
    }
    const schedule_name = strip(req.params.schedule_name)
    const newSchedule = {
        name: schedule_name,
        courses: [] 
    }
    schedules.push(newSchedule)
    var data = JSON.stringify(schedules, null, 2)
    fs.writeFile('schedules.json', data, (err) => {
        if (err) throw err;
      });
    res.send(newSchedule) 
});

// delete a schdeule from the schdeule JSON file
router.delete('/schedules/:schedule_name', (req, res) => {
    console.log(`DELETE request from ${req.url}`);
    if(validate(req.params.schedule_name)){
        res.status(400).send('No schedules by this name')
        return
    }
    const schedule_name = strip(req.params.schedule_name)
    const schedule = schedules.find(s => s.name.toUpperCase() === schedule_name.toUpperCase())
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
// add courses to a specific schedule
router.put('/schedule/courses', (req, res) => {
    if(validate(req.body.scheduleName) || validate(req.body.subjectNames) || validate(req.body.courseNumbers)){
        res.status(400).send('invalid input')
    }

    const scheduleName = strip(req.body.scheduleName)
    const subjectNames = strip(req.body.subjectNames)
    const courseNumbers = strip(req.body.courseNumbers)

    const scheduleNum = schedules.findIndex(s => s.name.toUpperCase() === scheduleName)
    const subjectsArray = subjectNames.split(" ")
    const courseNumberArray = courseNumbers.split(" ")
    if(scheduleNum < 0){
        res.status(400).send('schedule is not present')
        return
    }
    // check if items are in the schdeule already or not
    else{
        for(let i=0;i<subjectsArray.length;i++){
            if(schedules[scheduleNum].courses.find(p => p[0] === subjectsArray[i]) && schedules[scheduleNum].courses.find(p => p[1] === courseNumberArray[i])){
                schedules[scheduleNum].courses[i]=([subjectsArray[i],courseNumberArray[i]])
            }
            else{
                schedules[scheduleNum].courses.push([subjectsArray[i],courseNumberArray[i]])
            }
            
        }
    }
    var data = JSON.stringify(schedules, null, 2)
    fs.writeFile('schedules.json', data, (err) => {
        if (err) throw err;
      });
    res.send(schedules[scheduleNum]) 
});
// get all the schedules
router.get('/all_schedules', (req, res) => {
    console.log(`GET request from ${req.url}`);
    let scheduleSummary = []
    for(schedule of schedules){
        scheduleSummary.push([schedule["name"],schedule["courses"].length])
    }
    res.send(scheduleSummary)
});
// delete all schedules
router.delete('/all_schedules', (req, res) => {
    console.log(`GET request from ${req.url}`);
    schedules = []
    var data = JSON.stringify(schedules, null, 2)
    fs.writeFile('schedules.json', data, (err) => {
        if (err) throw err;
    });

    res.send(schedules)
});

// get specific schedule
router.get('/schedules/:schedule_name', (req, res) => {
    console.log(`GET request from ${req.url}`);
    if(validate(req.params.schedule_name)){
        res.status(400).send('invalid input')
        return
    }

    const schedule_name = strip(req.params.schedule_name)
    let coursesList = []
    for(schedule of schedules){
        if (schedule_name === schedule.name.toUpperCase()){
            coursesList = schedule.courses
        }
    }
    if (coursesList.length === 0){
        res.status(404).send('no schedule with that name or its empty')
    }
    res.send(coursesList)
});

app.use('/api', router);

// input validation
function validate(inputString){
    return ((inputString.length<2) || (inputString.length>20))
}
// input sanitization
function strip(inputString){
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
    return inputString.replace(format, "")
}