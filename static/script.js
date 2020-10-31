document.getElementById("get-all-courses").addEventListener('click', getAllCourses);
document.getElementById("find-course").addEventListener('click', getSelectCourses);

function getAllCourses(){
    fetch("api/courses/all")
    .then(res => res.json()
    .then(data =>{
        const l = document.getElementById('courses-list');
        data.forEach(c =>{
            const course = document.createElement('li')
            course.appendChild(document.createTextNode(`Subject: ${c.subject} Class Name: ${c.className}`))
            l.appendChild(course)
        })
        // console.log(data);
    })
    )
}

function getSelectCourses(){
    const subject = document.getElementById('subject-name').value
    fetch("/api/courses/"+subject)
    .then(res => res.json()
    .then(data =>{
        const l = document.getElementById('course-list-by-subject');
        while(l.firstChild ){
            l.removeChild(l.firstChild );
        }
        data.forEach(c =>{
            const course = document.createElement('li')
            course.appendChild(document.createTextNode(`Course Number: ${c}`))
            l.appendChild(course)
            })
            // console.log(data);
        })
    )
}