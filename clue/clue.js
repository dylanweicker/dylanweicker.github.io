//CLUE DATA

var cardType = {suspect: 0, weapon: 1, room: 2};

var scarlett = {
    "name": "Druid",
    "cardType": cardType.suspect,
    "knownImage": new Image(),
    "unknownImage": new Image(),
    "knownSelectedImage": new Image(),
    "unknownSelectedImage": new Image(),
    "card": new Image()
};
scarlett.knownImage.src = "images/sorcererbutton_known.png";
scarlett.unknownImage.src = "images/sorcererbutton_unknown.png";
scarlett.knownSelectedImage.src = "images/sorcererbutton_knownselected.png";
scarlett.unknownSelectedImage.src = "images/sorcererbutton_unknownselected.png";
scarlett.card.src = "images/druidcard.png";

var mustard = {
    "name": "Ranger",
    "cardType": cardType.suspect,
    "card": new Image()
};
mustard.card.src = "images/rangercard.png";

var green = {
    "name": "Warrior",
    "cardType": cardType.suspect,
    "card": new Image()
};
green.card.src = "images/warriorcard.png";

var peacock = {
    "name": "Sorcerer",
    "cardType": cardType.suspect,
    "card": new Image()
};
peacock.card.src = "images/sorcerercard.png";

var plum = {
    "name": "Warlock",
    "cardType": cardType.suspect,
    "card": new Image()
};
plum.card.src = "images/sorcerercard.png";

var white = {
    "name": "Cleric",
    "cardType": cardType.suspect,
    "card": new Image()
};
white.card.src = "images/clericcard.png";


//weapons
var dagger = {
    "name": "Dagger",
    "cardType": cardType.weapon
};
var pipe = {
    "name": "Pipe",
    "cardType": cardType.weapon
};
var revolver = {
    "name": "Revolver",
    "cardType": cardType.weapon
};
var candlestick = {
    "name": "Candlestick",
    "cardType": cardType.weapon
};
var wrench = {
    "name": "Wrench",
    "cardType": cardType.weapon
};
var rope = {
    "name": "Rope",
    "cardType": cardType.weapon
};

//rooms
var kitchen = {
    "name": "Kitchen",
    "cardType": cardType.room
};
var ballroom = {
    "name": "Ballroom",
    "cardType": cardType.room
};
var conservatory = {
    "name": "Conservatory",
    "cardType": cardType.room
};
var billiards = {
    "name": "Billiards room",
    "cardType": cardType.room
};
var library = {
    "name": "Library",
    "cardType": cardType.room
};
var hall = {
    "name": "Hall",
    "cardType": cardType.room
};
var lounge = {
    "name": "Lounge",
    "cardType": cardType.room
};
var study = {
    "name": "Study",
    "cardType": cardType.room
};
var dining = {
    "name": "Dining room",
    "cardType": cardType.room
};

var suspects = [scarlett, mustard, green, peacock, plum, white];
var allSuspects = suspects.slice();
var weapons = [dagger, pipe, wrench, rope, candlestick, revolver];
var allWeapons = weapons.slice();
var rooms = [kitchen, ballroom, conservatory, billiards, library, dining, study, lounge, hall];
var allRooms = rooms.slice();

var solutionSuspect;
var solutionAnswer;
var solutionRoom;

var playerKnows = [];
var playerHolds = [];
var oneknows = [];
var oneholds = [];
var twoknows = [];
var twoholds = [];

var selectedSuspect = scarlett;
var selectedWeapon = dagger;
var selectedRoom = hall;


//CANVAS DATA
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var HEIGHT = 650;
var WIDTH = 854;

var mouseX;
var mouseY;

var selectX1 = 60;
var selectSuspectY = 90;
var selectWeaponY = 190;
var selectRoomY = 290;
var guessY = 380;

var selectButtonHeight = 50;
var selectButtonWidth =50;
var guessButtonWidth = 75;
var selectButtonWidthAndMargin =60;

var information = [""];

//Canvas functions
var frames = 30;
var timerId = 0;
timerId = setInterval(update, 1000/frames);

c.addEventListener("mouseup", checkClick);

function clear(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function update() {
    clear();
    draw();
}

function checkClick(mouseEvent){
    mouseX = mouseEvent.pageX - this.offsetLeft;
    mouseY = mouseEvent.pageY - this.offsetTop;

    for(i = 0; i < allSuspects.length; i++)
        {
        if(mouseY > selectSuspectY && mouseY < selectSuspectY + selectButtonHeight)
        {
            if(mouseX > selectX1 + i*(selectButtonWidthAndMargin) && mouseX < selectX1 + selectButtonWidth + i*(selectButtonWidthAndMargin))
            {
                selectedSuspect = allSuspects[i];
            }
        }
    }
    
    for(i = 0; i < allWeapons.length; i++)
        {
        if(mouseY > selectWeaponY && mouseY < selectWeaponY + selectButtonHeight)
        {
            if(mouseX > selectX1 + i*(selectButtonWidthAndMargin) && mouseX < selectX1 + selectButtonWidth + i*(selectButtonWidthAndMargin))
            {
                selectedWeapon = allWeapons[i];
            }
        }
    }
    
    for(i = 0; i < allRooms.length; i++)
        {
        if(mouseY > selectRoomY && mouseY < selectRoomY + selectButtonHeight)
        {
            if(mouseX > selectX1 + i*(selectButtonWidthAndMargin) && mouseX < selectX1 + selectButtonWidth + i*(selectButtonWidthAndMargin))
            {
                selectedRoom = allRooms[i];
            }
        }
    }
    
    if(mouseY > guessY && mouseY < guessY + selectButtonHeight)
        {
            if(mouseX > selectX1 && mouseX < selectX1 + guessButtonWidth)
            {
                makeGuess();
            }
        }
}

//Shuffle Function by Daplie/knuth-shuffle
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function main(){
    //put one suspect into solution
    suspects = shuffle(suspects);
    solutionSuspect = suspects.pop();
    
    //put one weapon into solution
    weapons = shuffle(weapons);
    solutionWeapon = weapons.pop();
    
    //put one room into solution
    rooms = shuffle(rooms);
    solutionRoom = rooms.pop();
    
    var deck = suspects.concat(weapons, rooms);
    deck = shuffle(deck);
    
    //deal cards
    var handSize = deck.length/3;
    playerHolds = deck.slice(0, handSize);
    oneHolds = deck.slice(handSize, 2*handSize);
    twoHolds = deck.slice(2*handSize, 3*handSize);
    
    playerKnows = playerHolds.slice();
    oneKnows = oneHolds.slice();
    twoKnows = twoHolds.slice();
    
}

function includes(k) {
  for(var i=0; i < this.length; i++){
    if( this[i] === k || ( this[i] !== this[i] && k !== k ) ){
      return true;
    }
  }
  return false;
}


//return an array of text lines split according to width.
function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function draw(){
    ctx.beginPath();
    ctx.rect(0, HEIGHT-160, WIDTH, 160);
    ctx.fillStyle = 'grey';
    ctx.fill();
    
    ctx.beginPath();
    ctx.rect(HEIGHT, 0, WIDTH, HEIGHT);
    ctx.fillStyle = 'lightgrey';
    ctx.fill();
    
    drawMovementOptions();
    
    drawInformation();
    
    drawHand();
    
    //if it is time to make a guess then draw make guess
    if(true){
        drawMakeGuess();
    }
}

function drawInformation(){
    y=80;
    x= HEIGHT+10;
    for(var i = information.length-1; i > -1; i--){
         ctx.beginPath();
        ctx.textAlign="left"; 
        ctx.font = "12px Arial";
        ctx.fillStyle = '#black';
        ctx.fillText(information[i], HEIGHT+10, y);
        ctx.fill();
        y+=14;
    }
   
}

function drawMovementOptions(){
    var width = WIDTH - HEIGHT;
    
    ctx.beginPath();
    ctx.textAlign="left"; 
    ctx.font = "12px Arial";
    ctx.fillStyle = '#555555';
    ctx.fillText("remain", WIDTH-width+15, 30);
    ctx.fill();
    
    ctx.beginPath();
    ctx.textAlign="center"; 
    ctx.font = "12px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("roll", WIDTH-width/2, 30);
    ctx.fill();
    
    ctx.beginPath();
    ctx.textAlign="right"; 
    ctx.font = "12px Arial";
    ctx.fillStyle = '#555555';
    ctx.fillText("portal", WIDTH-15, 30);
    ctx.fill();
    
    ctx.textAlign="left"; 
}

function drawHand(){
    var x = 0;
    for (var i = 0; i < playerHolds.length; i++){
        if (playerHolds[i].cardType == cardType.suspect){
            ctx.drawImage(playerHolds[i].card, x+6, HEIGHT-150);
        }
        else{
            ctx.beginPath();
            roundRect(ctx, x+6, HEIGHT-150, 94, 140);
            //ctx.rect(x+10, 330, 85, 140);
            ctx.fillStyle = 'white';
            ctx.fill();

            ctx.font = "12px Arial";
            ctx.fillStyle = 'black';
            ctx.fillText(playerHolds[i].name, x+12,HEIGHT-40);
        }
        x+=108;
    }
}

function drawSelectSuspectButtons(){
    for (var i = 0; i < allSuspects.length; i++){
        
        x = selectX1 + i*selectButtonWidthAndMargin;
        y = selectSuspectY;
        
        if(playerKnows.includes(allSuspects[i])){
            if(selectedSuspect == allSuspects[i]){
                ctx.drawImage(scarlett.knownSelectedImage,x,y);
            }
            else{
            ctx.drawImage(scarlett.knownImage,x,y);
            }
        }
        else{
            
            if(selectedSuspect == allSuspects[i]){
                ctx.drawImage(scarlett.unknownSelectedImage,x,y);
            }
            else{
            ctx.drawImage(scarlett.unknownImage,x,y);
            }
        }
    }
}



function drawMakeGuess(){

    
    //draw guess box background
    ctx.beginPath();
    ctx.rect(50, 50, HEIGHT-100, HEIGHT-260);
    ctx.fillStyle = '#f1f1d4';
    ctx.fill();
    
    //draw suspect boxes
    x = selectX1;
    y = selectSuspectY;
    ctx.font = "18px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("Suspect:", x,y-18);
    drawSelectSuspectButtons();
    
    //draw weapon boxes
    x = selectX1;
    y = selectWeaponY;
    ctx.font = "18px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("Weapon:", x, y-18);
    for (var i = 0; i < allWeapons.length; i++){
        
        if(playerKnows.includes(allWeapons[i])){
            
            ctx.beginPath();
            ctx.rect(x, y, 50, 50);
            ctx.fillStyle = 'lightgrey';
            ctx.fill();
        }
        else{
            ctx.beginPath();
            ctx.rect(x, y, 50, 50);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
            
        ctx.font = "9px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText(allWeapons[i].name, x+4, y+25);
        x += 60;
    }
    
    //draw first row of room buttons
    x = selectX1;
    y = selectRoomY;
    ctx.font = "18px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("Room:", x,y-18);
    for (var i = 0; i < allRooms.length; i++){
        if(playerKnows.includes(allRooms[i])){
            
            ctx.beginPath();
            ctx.rect(x, y, 50, 50);
            ctx.fillStyle = 'lightgrey';
            ctx.fill();
        }
        else{
            ctx.beginPath();
            ctx.rect(x, y, 50, 50);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
            
        ctx.font = "9px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText(allRooms[i].name, x+4, y+25);
        x += 60;
    }
    
    //draw guess button
    x = selectX1;
    y = guessY;
    ctx.beginPath();
    ctx.rect(x, y, guessButtonWidth, selectButtonHeight);
    ctx.fillStyle = 'steelblue';
    ctx.fill();
    
    ctx.font = "12px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText("Guess!", x+8, y+25);
    
}

function selectSuspect(suspect){
    selectedSuspect = suspect;
}
function selectWeapon(weapon){
    selectedSuspect = suspect;
}
function selectRoom(room){
    selectedSuspect = suspect;
}

function makeGuess(){
        
    var text = "You have guessed " + selectedSuspect.name + " killed the king with the " + selectedWeapon.name + " in the " + selectedRoom.name + ".";
    var lines = getLines(ctx, text, WIDTH-HEIGHT-20);
    lines.push("");
    lines.reverse();
    
    information = information.concat(lines);
    
    
    document.getElementById("output").innerHTML = "You have guessed " + selectedSuspect.name + " killed the king with the " + selectedWeapon.name + " in the " + selectedRoom.name + ".";
    
    //check if solution
    if(selectedSuspect == solutionSuspect && selectedWeapon == solutionWeapon && selectedRoom == solutionRoom){
    document.getElementById("output").innerHTML = "You win!";
    }
        else{

        var randomOrder = [1, 2, 3]
        shuffle(randomOrder);

        var originalLength = playerKnows.length;
        var newLength = playerKnows.length;

        //ask One to reveal a card to disprove
        for (var i = 0; i < 3; i++){
            if (randomOrder[i] == 1){
                if (oneHolds.includes(selectedSuspect)){
                    document.getElementById("output").innerHTML = "AI One has shown you " + selectedSuspect.name + ".";
                    newLength = playerKnows.push(selectedSuspect);
                    break;
                }
            }
            if (randomOrder[i] == 2){
                if (oneHolds.includes(selectedWeapon)){
                    document.getElementById("output").innerHTML = "AI One has shown you " + selectedWeapon.name + ".";
                    newLength = playerKnows.push(selectedWeapon);
                    break;
                }
            }
            if (randomOrder[i] == 3){
                if (oneHolds.includes(selectedRoom)){
                    document.getElementById("output").innerHTML = "AI One has shown you " + selectedRoom.name + ".";
                    newLength = playerKnows.push(selectedRoom);
                    break;
                }
            }  
        }

        //if One does not have a card to disprove, ask Two.
        if (originalLength == newLength){
            for (var i = 0; i < 3; i++){
                 if (randomOrder[i] == 1){
                    if (twoHolds.includes(selectedSuspect)){
                        document.getElementById("output").innerHTML = "AI Two has shown you " + selectedSuspect.name + ".";
                        newLength = playerKnows.push(selectedSuspect);
                        break;
                    }
                }
                if (randomOrder[i] == 2){
                    if (twoHolds.includes(selectedWeapon)){
                        document.getElementById("output").innerHTML = "AI Two has shown you " + selectedWeapon.name + ".";
                        newLength = playerKnows.push(selectedWeapon);
                        break;
                    }
                }
                if (randomOrder[i] == 3){
                    if (twoHolds.includes(selectedRoom)){
                        document.getElementById("output").innerHTML = "AI Two has shown you " + selectedRoom.name + ".";
                        newLength = playerKnows.push(selectedRoom);
                        break;
                    }
                }
            }  
        }
        if (originalLength == newLength){
            document.getElementById("output").innerHTML = "No one was able to disprove you.";
        }
    }
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}