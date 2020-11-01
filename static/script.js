document.getElementById("get-all-courses").addEventListener('click', getAllCourses);
// get all buttons
document.getElementById("find-course").addEventListener('click', getSelectCourses);
document.getElementById("find-timetable-entry").addEventListener('click', getTimetableEntry);
document.getElementById("make-schedule").addEventListener('click', setNewSchedule);
document.getElementById("add-courses").addEventListener('click', addCourses);
document.getElementById("see-schedule-button").addEventListener('click', seeSelectedSchedule);
document.getElementById("delete-schedule").addEventListener('click', deleteSchedule);
document.getElementById("get-all-schedules").addEventListener('click', getAllSchdeules);
document.getElementById("delete-all-schedules").addEventListener('click', deleteAllSchedules);
// get all the courses
function getAllCourses(){
    fetch("api/all_courses")
    .then(res => res.json()
    .then(data =>{
        const allCourseList = document.getElementById('courses-list');
        while(allCourseList.firstChild ){
            allCourseList.removeChild(allCourseList.firstChild);
        }
        // dynamically make list elements
        data.forEach(c =>{
            const course = document.createElement('li')
            course.appendChild(document.createTextNode(`Subject: ${c.subject} | Class Name: ${c.className}`))
            allCourseList.appendChild(course)
        })
    })
    )
}
// get course codes for a subject
function getSelectCourses(){
    const subject = document.getElementById('subject-name').value
    fetch("/api/courses/"+subject.toUpperCase())
    .then(res => {
        if (res.ok){
            res.json()
            .then(data =>{
                 // dynamically make list elements
                const selectCourseList = document.getElementById('course-list-by-subject');
                while(selectCourseList.firstChild ){
                    selectCourseList.removeChild(selectCourseList.firstChild);
                }
                data.forEach(c =>{
                    const course = document.createElement('li')
                    course.appendChild(document.createTextNode(`Course Number: ${c}`))
                    selectCourseList.appendChild(course)
                    })                })
            .catch(err => console.log("failed to get object"))
        }
        else{
            alert(`${res.status}, invalid input or subject does not exist`);
        }
    })
    .catch()
}
// get all course components
function getTimetableEntry(){
    const subjectEntry = document.getElementById('subject-name-timetable').value.toUpperCase()
    const courseCode = document.getElementById('course-code-timetable').value.toUpperCase()
    const component = document.getElementById('course-component-timetable').value.toUpperCase()
    fetch(`/api/courses/${subjectEntry}/${courseCode}/${component}`)
    .then(res => {
        if (res.ok){
            res.json()
             // dynamically make list elements
            .then(data =>{
                console.log(data)
                const timetableEntries = document.getElementById('timetable-entries');
                while(timetableEntries.firstChild ){
                    timetableEntries.removeChild(timetableEntries.firstChild);
                }
                data.forEach(c =>{
                    const course = document.createElement('li')
                    course.appendChild(document.createTextNode(`Class Number: ${c.class_nbr} | Days: ${c.days.join(", ")} | Start Time: ${c.start_time} | Location: ${c.facility_ID} | Type: ${c.ssr_component}`))
                    // change colour background
                    if(c.ssr_component === "LEC"){
                        course.style.backgroundColor = "aqua"
                    }
                    else if(c.ssr_component === "LAB"){
                        course.style.backgroundColor = "salmon"
                    }
                    else{
                        course.style.backgroundColor = "palegreen"
                    }

                    timetableEntries.appendChild(course)
                    })
                })
            .catch(err => console.log("failed to get object"))
        }
        else{
            alert(`${res.status}, No timetable entries! Or InvalidInput!`);
        }
    })
    .catch()

}
// make a new schdeule with a name
function setNewSchedule(){
    const scheduleName = document.getElementById('schedule-name').value
    fetch('/api/schedules/'+scheduleName,{
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
    })
    .then(res => {
        if (res.ok){
            res.json()
            .then(data =>{
                console.log(data)
                })
            .catch(err => console.log("failed to get object"))
        }
        else{
            alert(`${res.status}, already timetable with that name or invalid timetable name`);
        }
    })
    .catch()
}
// delete all schedules
function deleteAllSchedules(){
    fetch('/api/all_schedules',{
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
    })
    .then(res => {
        if (res.ok){
            res.json()
            .then(data =>{
                console.log(data)
                })
            .catch( err => console.log("failed to get object"))
        }
        else{
            alert(`${res.status}, Error`);
        }
    })
    .catch()
}
// delete a specific schedule
function deleteSchedule(){
    const scheduleName = document.getElementById('schedule-name').value
    fetch('/api/schedules/'+scheduleName,{
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
    })
    .then(res => {
        if (res.ok){
            res.json()
            .then(data =>{
                console.log(data)
                })
            .catch(err => console.log("failed to get object"))
        }
        else{
            alert(`${res.status}, No Schedule with this name`);
        }
    })
    .catch()
}
// see all schedules summary
function getAllSchdeules(){
    fetch("api/all_schedules")
    .then(res => res.json()
    .then(data =>{
        const allScheduleList = document.getElementById('schedules-list');
        while(allScheduleList.firstChild ){
            allScheduleList.removeChild(allScheduleList.firstChild);
        }
        data.forEach(s =>{
            const schedule = document.createElement('li')
            schedule.appendChild(document.createTextNode(`Schedule Name: ${s[0]} | Number of Courses: ${s[1]}`))
            allScheduleList.appendChild(schedule)
        })
    })
    )
}
// addcourses to a schedule
function addCourses(){
    const scheduleCourses = {
        scheduleName: document.getElementById('add-schedule-name').value.toUpperCase(),
        subjectNames: document.getElementById('add-subject-name-timetable').value.toUpperCase(),
        courseNumbers: document.getElementById('add-course-code-timetable').value.toUpperCase(),
    }
    fetch('/api/schedule/courses',{
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(scheduleCourses)
    })

    .then(res => {
        if (res.ok){
            res.json()
            .then(data => console.log(data))
            .catch(err =>console.log("failed to get JSON object"))
        }
        else{
            alert(`${res.status}, No Schedules with that name or Invalid Input`);
        }
        
    })
    .catch()
}
// see a specifc schedule and courses inside it
function seeSelectedSchedule(){
    const scheduleName = document.getElementById('selected-schedule-name').value.toUpperCase()
    fetch("/api/schedules/"+scheduleName)
    .then(res => {
        if (res.ok){
            res.json()
            .then(data =>{
                 // dynamically make list elements
                const scheduleCoursesList = document.getElementById('selected-schedule-courses-list');
                while(scheduleCoursesList.firstChild ){
                    scheduleCoursesList.removeChild(scheduleCoursesList.firstChild);
                }
                data.forEach(c =>{
                    const course = document.createElement('li')
                    course.appendChild(document.createTextNode(`Subject: ${c[0]} | Course Code: ${c[1]} `))
                    scheduleCoursesList.appendChild(course)
                    })
                console.log(data)
                })
            .catch(err => console.log("failed to get object"))
        }
        else{
            alert(`${res.status}, No Schedules with that name or Schdeule is empty or invalid input`);
        }
    })
    .catch()
    
}