function toggleHiddenMenu(){
    if (window.innerWidth < 893){
        toggleDropDownMenu();
    }
    else{
        openLongMenu();
    }
}

function toggleDropDownMenu(){
    var hiddenMenu = document.getElementById("hidden-menu");
    if (hiddenMenu.style.display === 'none') {
        hiddenMenu.style.display = 'block';
    } else {
        hiddenMenu.style.display = 'none';
    }
}

function openLongMenu(){
    var longNav = document.getElementById("long-nav");
    var sandwichBtn = document.getElementById("sandwich-btn");
    longNav.style.display = 'block';
    sandwichBtn.style.display = 'none';
        
}