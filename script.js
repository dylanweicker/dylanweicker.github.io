function getAge(){
    var birthday = new Date("1995-04-15");
    return Math.floor((Date.now() - birthday)/ 31557600000);
}

function viewCourses(){
    document.getElementById('course-summary').style.display = "block";
    document.getElementById('view-courses').style.display = "none";
}

function hideCourses(){
    document.getElementById('course-summary').style.display = "none";
    document.getElementById('view-courses').style.display = "inline-block";
    window.location.href = "#education";
    //Todo Jump to top of education
}