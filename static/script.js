document.getElementById("get-all-courses").addEventListener('click', getAllCourses);
document.getElementById("find-course").addEventListener('click', getSelectCourses);
document.getElementById("find-timetable-entry").addEventListener('click', getTimetableEntry);
document.getElementById("make-schedule").addEventListener('click', setNewSchedule);
document.getElementById("add-courses").addEventListener('click', addCourses);
document.getElementById("see-schedule-button").addEventListener('click', seeSelectedSchedule);
document.getElementById("delete-schedule").addEventListener('click', deleteSchedule);




function getAllCourses(){
    fetch("api/courses/all")
    .then(res => res.json()
    .then(data =>{
        const allCourseList = document.getElementById('courses-list');
        data.forEach(c =>{
            const course = document.createElement('li')
            course.appendChild(document.createTextNode(`Subject: ${c.subject} Class Name: ${c.className}`))
            allCourseList.appendChild(course)
        })
    })
    )
}

function getSelectCourses(){
    const subject = document.getElementById('subject-name').value
    fetch("/api/courses/"+subject)
    .then(res => res.json()
    .then(data =>{
        const selectCourseList = document.getElementById('course-list-by-subject');
        while(selectCourseList.firstChild ){
            selectCourseList.removeChild(selectCourseList.firstChild);
        }
        data.forEach(c =>{
            const course = document.createElement('li')
            course.appendChild(document.createTextNode(`Course Number: ${c}`))
            selectCourseList.appendChild(course)
            })
        })
    )
}

function getTimetableEntry(){
    const subjectEntry = document.getElementById('subject-name-timetable').value
    const courseCode = document.getElementById('course-code-timetable').value
    const component = document.getElementById('course-component-timetable').value
    fetch(`/api/courses/${subjectEntry}/${courseCode}/${component}`)
    .then(res => {
        if (res.ok){
            res.json()
            .then(data =>{
                const timetableEntries = document.getElementById('timetable-entries');
                while(timetableEntries.firstChild ){
                    timetableEntries.removeChild(timetableEntries.firstChild);
                }
                data.forEach(c =>{
                    const course = document.createElement('li')
                    course.appendChild(document.createTextNode(`Class Number: ${c.class_nbr} | Days: ${c.days.join(", ")} | Start Time: ${c.start_time} | Location: ${c.facility_ID}`))
                    timetableEntries.appendChild(course)
                    })
                console.log(data)
                })
            .catch(console.log("failed to get object"))
        }
        else{
            alert(`${res.status}, No timetable entries!`);
        }
    })
    .catch()

}

function setNewSchedule(){
    const scheduleName = document.getElementById('schedule-name').value
    fetch('/api/schedule/'+scheduleName,{
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
    })
    .then(res => {
        if (res.ok){
            res.json()
            .then(data =>{
                console.log(data)
                })
            .catch(console.log("failed to get object"))
        }
        else{
            alert(`${res.status}, already timetable with that name`);
        }
    })
    .catch()
}

function deleteSchedule(){
    const scheduleName = document.getElementById('schedule-name').value
    fetch('/api/schedule/'+scheduleName,{
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
    })
    .then(res => {
        if (res.ok){
            res.json()
            .then(data =>{
                console.log(data)
                })
            .catch(console.log("failed to get object"))
        }
        else{
            alert(`${res.status}, No Schedule with this name`);
        }
    })
    .catch()
}

function addCourses(){
    const scheduleCourses = {
        scheduleName: document.getElementById('add-schedule-name').value,
        subjectNames: document.getElementById('add-subject-name-timetable').value,
        courseNumbers: document.getElementById('add-course-code-timetable').value,
    }
    fetch('/api/schedule/courses',{
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(scheduleCourses)
    })

    .then(res => {
        res.json()
        .then(data => console.log(data))
        .catch(console.log("failed to get JSON object"))
    })
    .catch(`${res.status}, No schdeule with that name!`)
}

function seeSelectedSchedule(){
    const scheduleName = document.getElementById('selected-schedule-name').value
    console.log(scheduleName)
    fetch("/api/schedule/"+scheduleName)
    .then(res => {
        if (res.ok){
            res.json()
            .then(data =>{
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
            .catch(console.log("failed to get object"))
        }
        else{
            alert(`${res.status}, No Schedules with that name`);
        }
    })
    .catch()
    
}