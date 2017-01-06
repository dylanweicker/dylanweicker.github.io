var player = {
    character: scarlett,
    hand: playerHolds,
    knowledge: playerKnows
}
var one = {
    character: peacock,
    hand: oneHolds,
    knowledge: oneKnows
}
var two = {
    character: white,
    hand: twoHolds,
    knowledge: twoKnows
}
var npc3 = green;
var npc4 = plum;
var npc5 = mustard;

var turnType = {playerSelectMovementType: 0, playerMove: 1, playerGuess: 2, oneMove: 3, oneGuess: 4, playerDisproveOne: 5, twoMove: 6, twoGuess: 7, playerDisproveTwo: 8, playerAccuse: 9, playerWins: 10, playerLoses: 11, oneWins: 12, twoWins: 13};
var turn = turnType.playerSelectMovementType;

var tabType = {notebook: 0, events: 1};
var tab = tabType.notebook;

var buttons = {rollButton: 0, accuseButton: 1, stayButton: 2, stairsButton: 3, notebookButton: 4, eventsButton: 5};
var hover = null;

//CANVAS DATA
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var mouseX;
var mouseY;


var selectX1 = 60;
var selectSuspectY = 90;
var selectWeaponY = 190;
var selectRoomY = 290;
var guessY = 380;

var rollButtonY = 24;
var stayButtonY = 30;
var accuseButtonY = 150;
var tabsY = 210;

var notebookTabX = screenWidth + 6;
var eventsTabX = screenWidth + 110;


var information = [""];

//Canvas functions
var frames = 15;
var timerId = 0;
timerId = setInterval(update, 1000/frames);

c.addEventListener("mouseup", checkClick);
document.addEventListener("keydown", checkKey, false);
c.addEventListener("mousemove", checkPos);

function clear(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function update() {
    clear();
    draw();
}

function checkPos(mouseEvent){
    mouseX = mouseEvent.pageX - this.offsetLeft;
    mouseY = mouseEvent.pageY - this.offsetTop;
    hover = null;

    if(mouseY > tabsY && mouseY < tabsY + notebookButton.height){
            if(mouseX > notebookTabX && mouseX < notebookTabX + notebookButton.width)
            {
                hover = buttons.notebookButton;
            }
            else if(mouseX > eventsTabX && mouseX < eventsTabX + eventsButton.width)
            {
                hover = buttons.eventsButton;
            }
    }

    if(turn == turnType.playerSelectMovementType){
        if(mouseY > rollButtonY && mouseY < rollButtonY + rollButton.height){
                if(mouseX > screenWidth + sidebarWidth/2 - rollButton.width/2 && mouseX < screenWidth + sidebarWidth/2 + rollButton.width/2)
                {
                    hover = buttons.rollButton;
                }
        }
        if(mouseY > accuseButtonY && mouseY < accuseButtonY + accuseButton.height){
                if(mouseX > screenWidth + sidebarWidth/2 - accuseButton.width/2 && mouseX < screenWidth + sidebarWidth/2 + accuseButton.width/2)
                {
                    hover = buttons.accuseButton;
                }
        }
        if(player.character.room != null){
            if(mouseY > stayButtonY && mouseY < stayButtonY + stayButton.height){
                if(mouseX > screenWidth + 10 && mouseX < screenWidth + 10 + stayButton.width)
                {
                    hover = buttons.stayButton;
                }
                else if(player.character.room == kitchen || player.character.room == lounge || player.character.room == study || player.character.room == conservatory){
                    if(mouseX > WIDTH - 10 - stairsButton.width && mouseX < WIDTH - 10)
                    {
                        hover = buttons.stairsButton;
                    }
                }
            }
        }

    }

    if (hover != null){
        document.body.style.cursor = "pointer";
    }
    else{
        document.body.style.cursor = "auto";
    }
}

function checkClick(mouseEvent){
    mouseX = mouseEvent.pageX - this.offsetLeft;
    mouseY = mouseEvent.pageY - this.offsetTop;

    if(mouseY > tabsY && mouseY < tabsY + notebookButton.height){
            if(mouseX > notebookTabX && mouseX < notebookTabX + notebookButton.width)
            {
                tab = tabType.notebook;
            }
            else if(mouseX > eventsTabX && mouseX < eventsTabX + eventsButton.width)
            {
                tab = tabType.events;
            }
    }

    if(turn == turnType.playerSelectMovementType){
        if(mouseY > rollButtonY && mouseY < rollButtonY + rollButton.height){
                if(mouseX > screenWidth + sidebarWidth/2 - rollButton.width/2 && mouseX < screenWidth + sidebarWidth/2 + rollButton.width/2)
                {
                    rollDie();
                    turn = turnType.playerMove;
                }
        }

        if(player.character.room != null){
            if (mouseY > stayButtonY && mouseY < stayButtonY + stayButton.height){
                if(mouseX > screenWidth+10 && mouseX < screenWidth+10 + stayButton.width){
                    turn = turnType.playerGuess;
                }
            }
        }

        if (mouseY > stayButtonY && mouseY < stayButtonY + stairsButton.height){
            if(mouseX > WIDTH-10-stayButton.width && mouseX < WIDTH-10){
                playerUsePortal();
            }
        }

        if(mouseY > accuseButtonY && mouseY < accuseButtonY + accuseButton.height){
                if(mouseX > screenWidth + sidebarWidth/2 - accuseButton.width/2 && mouseX < screenWidth + sidebarWidth/2 + accuseButton.width/2)
                {
                    turn = turnType.playerAccuse;
                }
        }
    }

    if(turn == turnType.playerGuess || turn == turnType.playerAccuse){
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
    }

    if (turn == turnType.playerAccuse){
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
    }

    if (turn == turnType.playerGuess){
        if(mouseY > guessY && mouseY < guessY + selectButtonHeight){
            if(mouseX > selectX1 && mouseX < selectX1 + guessButtonWidth)
            {
                makeGuess();
            }
        }
    }

    if (turn == turnType.playerAccuse){
        if(mouseY > guessY && mouseY < guessY + selectButtonHeight){
            if(mouseX > selectX1 && mouseX < selectX1 + guessButtonWidth)
            {
                makeAccusation();
            }
            else if(mouseX > selectX1 + guessButtonWidth + 10 && mouseX < selectX1 + 2*guessButtonWidth +10)
            {
                turn = turnType.playerSelectMovementType;
            }
        }
    }
}

function playerUsePortal(){
    if (player.character.room == conservatory){
        player.character.room = lounge;
        player.character.x = 24;
        player.character.y = 18;
        setTimeout( function(){
            turn = turnType.playerGuess;
        }, 400);
    }
    else if (player.character.room == lounge){
        player.character.room = conservatory;
        player.character.x = 3;
        player.character.y = 2;

        setTimeout( function(){
            turn = turnType.playerGuess;
        }, 400);
    }
    else if (player.character.room == kitchen){
        player.character.room = study;
        player.character.x = 24;
        player.character.y = 2;

        setTimeout( function(){
            turn = turnType.playerGuess;
        }, 400);
    }
    else if (player.character.room == study){
        player.character.room = kitchen;
        player.character.x = 5;
        player.character.y = 18;
        setTimeout( function(){
            turn = turnType.playerGuess;
        }, 400);
    }
}

function leaveRoom(x,y){
    player.character.x = x;
    player.character.y = y;
    player.character.room = null;
    dieResult--;
}

function checkKey(keyEvent){
    key = keyEvent.keyCode;
    if(turn == turnType.playerMove){
        switch(key){
        case 37: //left
            if(player.character.room == null){
                if (map[player.character.y][player.character.x-1] < 4 && dieResult > 0){
                    player.character.x--;
                    dieResult--;
                    checkPosition();
                }
            }
            else if(player.character.room == hall){
                leaveRoom(18,10);
            }
            break;
        case 39: //right
            if(player.character.room == null){
                if (map[player.character.y][player.character.x+1] < 4  && dieResult > 0){
                player.character.x++;
                dieResult--;
                checkPosition();
                }
            }
            else if(player.character.room == ballroom){
                leaveRoom(10,10);
            }
            else if(player.character.room == kitchen){
                leaveRoom(8,17);
            }
            break;
        case 38: //up
            if(player.character.room == null){
                if (map[player.character.y-1][player.character.x] < 4  && dieResult > 0){
                    player.character.y--;
                    dieResult--;
                    checkPosition();
                }
            }
            else if(player.character.room == hall){
                leaveRoom(21,5);
            }
            else if(player.character.room == lounge){
                leaveRoom(19,14);
            }
            else if(player.character.room == dining){
                leaveRoom(13,13);
            }
            break;
        case 40: //down
            if(player.character.room == null){
                if (map[player.character.y+1][player.character.x] < 4 && dieResult > 0 ){
                player.character.y++;
                dieResult--;
                checkPosition();
                }
            }
            else if(player.character.room == conservatory ||
                player.character.room == billiards ||
                player.character.room == library ||
                player.character.room == study
            ){
                leaveRoom(player.character.room.exit[0].x,player.character.room.exit[0].y);
            }
            else if(player.character.room == ballroom){
                leaveRoom(player.character.room.exit[1].x,player.character.room.exit[1].y);
            }
            break;
        default:
            break;
        }
    }
    if (dieResult < 1 && turn == turnType.playerMove && player.character.room == null){
        turn = turnType.oneMove;
        setTimeout(function(){aiOneMove()}, 1000);
    }
}

function checkPosition(){
    if (map[player.character.y][player.character.x] == 3){
        dieResult = 0;
        enterRoom(player.character);
        setTimeout( function(){
            turn = turnType.playerGuess;
        }, 400);
    }
}

function enterRoom(character, room){
    if (room == null){
        for (var i = 0; i < allRooms.length; i++){
            for (var j = 0; j < allRooms[i].door.length; j++){
                if (character.x == allRooms[i].door[j].x && character.y == allRooms[i].door[j].y){
                    room = allRooms[i];
                    break;
                }
            }
        }
    }

    character.room = room;
    selectedRoom = room;

    if (character == player.character){
        character.x = room.pos[0].x;
        character.y = room.pos[0].y;
    }
    else if (character == one.character){
        character.x = room.pos[1].x;
        character.y = room.pos[1].y;
    }
    else if (character == two.character){
        character.x = room.pos[2].x;
        character.y = room.pos[2].y;
    }
    else if (character == npc3){
        character.x = room.pos[3].x;
        character.y = room.pos[3].y;
    }
    else if (character == npc4){
        character.x = room.pos[4].x;
        character.y = room.pos[4].y;
    }
    else if (character == npc5){
        character.x = room.pos[5].x;
        character.y = room.pos[5].y;
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

var dieResult = 0;

function rollDie(){
    dieResult = Math.floor(Math.random()*5)+1;
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

function writeGuess(guesser){
        var text = guesser.character.name + " has guessed " + selectedSuspect.name + " killed the king with the " + selectedWeapon.name + " in the " + selectedRoom.name + ".";
        var lines = getLines(ctx, text, WIDTH-screenWidth-15);
        lines.push("");
        lines.reverse();
        information = information.concat(lines);
        purgeOldEvents();
        tab = tabType.events;
}

function purgeOldEvents(){
    while (information.length > 27){
        information.splice(0, 1);
    }
}

function unknownCards(ai, cardList){
    return cardList.filter(function(e){
        return (!ai.knowledge.includes(e));
    });
}

function unknownSuspects(ai){
    return unknownCards(ai, allSuspects);
}
function unknownWeapons(ai){
    return unknownCards(ai, allWeapons);
}
function unknownRooms(ai){
    return unknownCards(ai, allRooms);
}

function aiMakeGuess(ai){
    selectedSuspect = shuffle(unknownSuspects(ai)).pop();
    selectedWeapon = shuffle(unknownWeapons(ai)).pop();

    //bring selected suspect to room
    enterRoom(selectedSuspect, ai.character.room);
    writeGuess(ai);

    var randomOrder = [1, 2, 3]
    shuffle(randomOrder);
    var originalLength = ai.knowledge.length;
    
    //Two asks player -> one
    //One asks two ->player
    
    //One asks Two first
    if(ai == one){
        for (var i = 0; i < 3; i++){
             if (randomOrder[i] == 1){
                if (twoHolds.includes(selectedSuspect)){
                    text = two.character.name + " has shown " + ai.character.name + " a card.";
                    ai.knowledge.push(selectedSuspect);
                    break;
                }
            }
            if (randomOrder[i] == 2){
                if (twoHolds.includes(selectedWeapon)){
                    text = two.character.name + " has shown " + ai.character.name + " a card.";
                    ai.knowledge.push(selectedWeapon);
                    break;
                }
            }
            if (randomOrder[i] == 3){
                if (twoHolds.includes(selectedRoom)){
                    text = two.character.name + " has shown " + ai.character.name + " a card.";
                    ai.knowledge.push(selectedRoom);
                    break;
                }
            }
        }
    }
    //If we have not been disproved, ask the player
    if (originalLength == ai.knowledge.length){
        for (var i = 0; i < 3; i++){
             if (randomOrder[i] == 1){
                if (playerHolds.includes(selectedSuspect)){
                    text = "You have shown " + ai.character.name + " " + selectedSuspect.name;
                    ai.knowledge.push(selectedSuspect);
                    break;
                }
            }
            if (randomOrder[i] == 2){
                if (playerHolds.includes(selectedWeapon)){
                    text = "You have shown " + ai.character.name + " " +  selectedWeapon.name;
                    ai.knowledge.push(selectedWeapon);
                    break;
                }
            }
            if (randomOrder[i] == 3){
                if (playerHolds.includes(selectedRoom)){
                    text = "You have shown "  + ai.character.name + " " +  selectedRoom.name;
                    ai.knowledge.push(selectedRoom);
                    break;
                }
            }
        }
    }
    //If Two has not been disproved, ask one
    if(ai == two && originalLength == ai.knowledge.length){
        for (var i = 0; i < 3; i++){
             if (randomOrder[i] == 1){
                if (oneHolds.includes(selectedSuspect)){
                    text = one.character.name + " has shown " + ai.character.name + " a card.";
                    ai.knowledge.push(selectedSuspect);
                    break;
                }
            }
            if (randomOrder[i] == 2){
                if (oneHolds.includes(selectedWeapon)){
                    text = one.character.name + " has shown " + ai.character.name + " a card.";
                    ai.knowledge.push(selectedWeapon);
                    break;
                }
            }
            if (randomOrder[i] == 3){
                if (oneHolds.includes(selectedRoom)){
                    text = one.character.name + " has shown " + ai.character.name + " a card.";
                    ai.knowledge.push(selectedRoom);
                    break;
                }
            }
        }
    }
    if (originalLength == ai.knowledge.length){
            text = "No one was able to disprove " + ai.character.name + ".";
    }    

    lines = getLines(ctx, text, WIDTH-screenWidth-20);
    lines.push("");
    lines.reverse();
    information = information.concat(lines);
    purgeOldEvents();
    
}

function twoMakeGuess(){
    aiMakeGuess(two);
    turn = turnType.playerSelectMovementType;
}

function oneMakeGuess(){
    aiMakeGuess(one);

    turn = turnType.twoMove;
    setTimeout(function(){aiTwoMove()}, 1000);
}

function makeAccusation(){
    if (selectedRoom == solutionRoom && selectedSuspect == solutionSuspect && selectedWeapon == solutionWeapon){
        turn = turnType.playerWins;
    }
    else{
        turn = turnType.playerLoses;
    }
}

function makeGuess(){
    //Make Guess
    writeGuess(player);
    enterRoom(selectedSuspect, selectedRoom);

    //Disprove
    var randomOrder = [1, 2, 3]
    shuffle(randomOrder);
    var originalLength = playerKnows.length;
    var newLength = playerKnows.length;

    //ask One to reveal a card to disprove
    for (var i = 0; i < 3; i++){
        if (randomOrder[i] == 1){
            if (oneHolds.includes(selectedSuspect)){
                text = "AI One has shown you " + selectedSuspect.name + ".";
                newLength = playerKnows.push(selectedSuspect);
                break;
            }
        }
        if (randomOrder[i] == 2){
            if (oneHolds.includes(selectedWeapon)){
                text = "AI One has shown you " + selectedWeapon.name + ".";
                newLength = playerKnows.push(selectedWeapon);
                break;
            }
        }
        if (randomOrder[i] == 3){
            if (oneHolds.includes(selectedRoom)){
                text = "AI One has shown you " + selectedRoom.name + ".";
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
                    text = "AI Two has shown you " + selectedSuspect.name + ".";
                    newLength = playerKnows.push(selectedSuspect);
                    break;
                }
            }
            if (randomOrder[i] == 2){
                if (twoHolds.includes(selectedWeapon)){
                    text = "AI Two has shown you " + selectedWeapon.name + ".";
                    newLength = playerKnows.push(selectedWeapon);
                    break;
                }
            }
            if (randomOrder[i] == 3){
                if (twoHolds.includes(selectedRoom)){
                    text = "AI Two has shown you " + selectedRoom.name + ".";
                    newLength = playerKnows.push(selectedRoom);
                    break;
                }
            }
        }
    }

    //If two doesn't have a card to disprove, tell player
    if (originalLength == newLength){
            text = "No one was able to disprove you.";
    }

    lines = getLines(ctx, text, WIDTH-screenWidth-20);
    lines.push("");
    lines.reverse();
    information = information.concat(lines);
    purgeOldEvents();

    turn = turnType.oneMove;
    setTimeout(aiOneMove(), 1000);
}

function aiSelectMovementType(character, knowledge){
    //if room is unknown, remain in room
    if (!knowledge.includes(character.room)){
        return;
    }
    //if room is corner and opposite corner is unknown, go to opposite room
    if (character.room == kitchen && !knowledge.includes(study)){
        enterRoom(character, study);
        return;
    }
    if (character.room == study && !knowledge.includes(kitchen)){
        enterRoom(character, kitchen);
        return;
    }
    if (character.room == lounge && !knowledge.includes(conservatory)){
        enterRoom(character, conservatory);
        return;
    }
    if (character.room == conservatory && !knowledge.includes(lounge)){
        enterRoom(character, lounge);
        return;
    }
    //if room is known and corner is known, leave room.
    rollDie();
    character.x = character.room.exit[0].x;
    character.y = character.room.exit[0].y;
    character.room = null;
    dieResult--;
}

function getUnknownDoors(knowledge){
    var doors = Array();
    for (var i = 0; i < allRooms.length; i++){
        if (!knowledge.includes(allRooms[i])){
            for (var j = 0; j < allRooms[i].door.length; j++){
                doors.push(allRooms[i].door[j]);
            }
        }
    }
    return doors
}

function getBestPath(ai, goals){
    var bestPath = Array(mapWidth * mapHeight);

    for (var i = 0; i < goals.length; i++){
        var path = calculatePath([ai.character.x, ai.character.y], [goals[i].x, goals[i].y]);
        if (path.length < bestPath.length){
            bestPath = path;
        }
    }
    //remove start node
    bestPath.splice(0, 1);

    return bestPath;
}

function aiStep(ai, path){
    if (path.length == 0){
        enterRoom(ai.character);
        if (ai == one){
            turn = turnType.oneGuess;
        }
        else if (ai == two){
            turn = turnType.twoGuess;
        }
        return;
    }
    
    if (dieResult > 0){
    ai.character.x = path[0][0];
    ai.character.y = path[0][1];
    path.splice(0, 1);
    dieResult--;
    aiStep(ai, path);
    }
}

function aiTwoMove(){
    //If one knows the solution, make an accusation
    if(unknownSuspects(two).length == 1 && unknownWeapons(two).length == 1 && unknownRooms(two).length == 1){
        aiTwoAccuse();
        return;
    }
    
    aiMove(two);
    
    //if we are still not in a room, proceed to Two's turn
    if (two.character.room == null){
        turn = turnType.playerSelectMovementType;
    }
    //otherwise make a guess
    else{   
        setTimeout(function(){twoMakeGuess()}, 1000);
    }
}

function aiTwoAccuse(){
    turn = turnType.twoWins;
}
function aiOneAccuse(){
    turn = turnType.oneWins;
}

function aiOneMove(){
    //If one knows the solution, make an accusation
    if(unknownSuspects(one).length == 1 && unknownWeapons(one).length == 1 && unknownRooms(one).length == 1){
        aiOneAccuse();
        return;
    }
    
    aiMove(one);
    
    //if we are still not in a room, proceed to Two's turn
    if (one.character.room == null){
        setTimeout(function(){aiTwoMove()}, 1000);
    }
    //otherwise make a guess
    else{   
        setTimeout(function(){oneMakeGuess()}, 1000);
    }

}

function aiMove(ai){
    //if in room decide what to stay or leave:
    if (ai.character.room != null){
        aiSelectMovementType(ai.character, ai.knowledge);
    }
    //otherwise we must roll the die
    else{
        rollDie();
    }
    
    //if we are not in a room move to closest unknown room
    if (ai.character.room == null && dieResult > 0){
        var unknownDoors = getUnknownDoors(ai.knowledge);
        var bestPath = getBestPath(ai, unknownDoors);
        aiStep(ai, bestPath);
        dieResult = 0;
    }    
}

function manhattanDistance(point, goal){
    return Math.abs(point.x - goal.x) +  Math.abs(point.y - goal.y);
}

function canWalkHere(x, y){
    return (map[y] != null && map[y][x] != null && map[y][x] < 4); //todo make 4 a constant
}

function neighbours(x, y){
    var  n = y-1;
    var  s = y+1;
    var  e = x+1;
    var  w = x-1;
    var myN = n > 0 && canWalkHere(x, n);
    var myS = s < mapHeight && canWalkHere(x, s);
    var myE = e < mapWidth && canWalkHere(e, y);
    var myW = e > 0 && canWalkHere(w, y);

    var result = [];
    if (myN) result.push({"x":x, "y":n});
    if (myS) result.push({"x":x, "y":s});
    if (myE) result.push({"x":e, "y":y});
    if (myW) result.push({"x":w, "y":y});
    return result;
}

function node(parent, point){
    var newNode = {
        "parent": parent,
        "value": point.x + (point.y * mapWidth),
        "x": point.x,
        "y": point.y,
        //distance cost of this node to goal
        "heuristic": 0,
        //distance cost of this node from start
        "cost": 0
    }
    return newNode;
}

function calculatePath(pathStart, pathEnd){
    //create start and end nodes from given coordinates
    var myPathStart = node(null, {"x": pathStart[0], "y": pathStart[1]});
    var myPathEnd = node(null, {"x": pathEnd[0], y:pathEnd[1]});

    //create an array to hold each tile of the map
    var aStar = new Array(mapHeight * mapWidth);
    //list of open nodes
    var open = [myPathStart];
    //list of closed nodes
    var closed = [];
    //final result
    var result = [];


    var myNeighbours;
    var myNode;
    var myPath;
    var length, max, min, i, j;

    while(length = open.length){
        max = mapWidth * mapHeight;
        min = -1;
        for (i = 0; i < length; i++){
            if (open[i].heuristic < max){
                max = open[i].heuristic;
                min = i;
            }
        }
        myNode = open.splice(min, 1)[0];

        if(myNode.value === myPathEnd.value){   //found destination
            myPath = closed[closed.push(myNode) - 1];
            do{
                result.push([myPath.x, myPath.y]);
            }
            while (myPath = myPath.parent);

            aStar = closed = open = [];
            result.reverse();
        }
        else { //no destination
            //find neighbours
            myNeighbours = neighbours(myNode.x, myNode.y);
            for (i = 0, j = myNeighbours.length; i < j; i++){
                myPath = node(myNode, myNeighbours[i]);
                if (!aStar[myPath.value]){
                    myPath.cost = myNode.cost + manhattanDistance(myNeighbours[i], myNode); //can't this just be ++;
                    myPath.heuristic = myPath.cost + manhattanDistance(myNeighbours[i], myPathEnd);
                    open.push(myPath);
                    aStar[myPath.value] = true;
                }
            }
            closed.push(myNode);
        }
    }
    return result;
}
