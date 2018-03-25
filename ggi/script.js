function toggleHiddenMenu(){
    var hiddenMenu = document.getElementById("hidden-menu");
    if (hiddenMenu.style.display === 'none') {
        hiddenMenu.style.display = 'block';
    } else {
        hiddenMenu.style.display = 'none';
    }
}