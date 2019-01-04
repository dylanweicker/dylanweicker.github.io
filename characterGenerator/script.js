var charName;

hideContents();

function advanceToAbilities(){
    setName();
    hideNameContent();
    showAbilityContent();
}

function setName(){
    charName = $("#input-name").val();
    $("span.display-name").html(charName);
}

function hideContents(){
    $("#select-abilities").hide();
    //TODO ADD MORE
}

function showNameContent(){
    $("#select-name").show();
}
function hideNameContent(){
    $("#select-name").hide();
}
      
      
function showAbilityContent(){
    $("#select-abilities").show();
}   
function hideAbilityContent(){
    $("#select-abilities").hide();
}