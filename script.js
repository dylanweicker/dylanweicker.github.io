function getAge(){
    var birthday = new Date("1995-04-15");
    return Math.floor((Date.now() - birthday)/ 31557600000);
}

function getMonths(fromDate) {
    var toDate = new Date();
    var months;
    months = (toDate.getFullYear() - fromDate.getFullYear()) * 12;
    console.log(months);
    
    months -= fromDate.getMonth() + 1;
    console.log(months);
    
    months += toDate.getMonth() + 1;
    console.log(months);
    return months <= 0 ? 0 : months;
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


function viewVisionCritical(){
    document.getElementById('vision-critical-xp').style.display = "block";
    document.getElementById('vision-critical-view').style.display = "none";
}


function viewMazdis(){
    document.getElementById('mazdis-xp').style.display = "block";
    document.getElementById('mazdis-view').style.display = "none";
}