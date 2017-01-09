var HEIGHT = 680;
var WIDTH = 900;
var screenHeight = 480;
var screenWidth = 648;
var sidebarWidth = WIDTH-screenWidth;
var mapRowLength = 27;
var tileSize = 24;



var knownSuspectY1 = 230;
var knownSuspectY2 = knownSuspectY1+55;

var knownWeaponY1 = knownSuspectY2+75;
var knownWeaponY2 = knownWeaponY1+55;

var knownRoomY1 = knownWeaponY2+75;
var knownRoomY2 = knownRoomY1+55;
var knownRoomY3 = knownRoomY2+55;

var cardsY = screenHeight + 40;


// ----- POPUPS ----
var popup = new Image();
popup.src = "./images/Popup.png";

//Select Suspect/Weapon/Room buttons
var selectButton = new Image();
selectButton.src = "./images/SelectButton.png";
var selectedButton = new Image();
selectedButton.src = "./images/SelectedButton.png";

//Continue Button
var continueButton = new Image();
continueButton.src = "./images/ContinueButton.png";

//Cancel Button
var cancelButton = new Image();
cancelButton.src = "./images/CancelButton.png";


// ----- SIDEBAR -----
//Side bar button positions
var rollButtonY = 24;
var accuseButtonY = 150;
var tabsY = 210;
var accuseButtonWidth = 92;

var rollButtonPos = [screenWidth + 16, rollButtonY];
var stairsButtonPos = [WIDTH - accuseButtonWidth - 16, rollButtonY];
var guessButtonPos = [screenWidth + 16, accuseButtonY];
var accuseButtonPos = [WIDTH - accuseButtonWidth - 16, accuseButtonY];

//Roll die
var rollButton = new Image();
var rollButtonInactive = new Image();
var rollButtonHover = new Image();
rollButton.src = "./images/RollButton.png";
rollButtonInactive.src = "./images/RollButtonInactive.png";
rollButtonHover.src = "./images/RollButtonHover.png";

//Use Secret Passage
var stairsButton = new Image();
var stairsButtonInactive = new Image();
var stairsButtonHover = new Image();
stairsButton.src = "./images/PassageButton.png";
stairsButtonInactive.src = "./images/PassageButtonInactive.png";
stairsButtonHover.src = "./images/PassageButtonHover.png";

//Die Results
var die0 = new Image();
var die1 = new Image();
var die2 = new Image();
var die3 = new Image();
var die4 = new Image();
var die5 = new Image();
var die6 = new Image();
die0.src = "./images/DieZero.png";
die1.src = "./images/DieOne.png";
die2.src = "./images/DieTwo.png";
die3.src = "./images/DieThree.png";
die4.src = "./images/DieFour.png";
die5.src = "./images/DieFive.png";
die6.src = "./images/DieSix.png";
var dice = [die0, die1, die2, die3, die4, die5, die6];

//Make Suggestion
var stayButton = new Image();
var stayButtonInactive = new Image();
var stayButtonHover = new Image();
stayButton.src = "./images/SuggestButton.png";
stayButtonInactive.src = "./images/SuggestButtonInactive.png";
stayButtonHover.src = "./images/SuggestButtonHover.png";

//Make Accusation
var accuseButton = new Image();
var accuseButtonInactive = new Image();
var accuseButtonHover = new Image();
accuseButton.src = "./images/AccuseButton.png";
accuseButtonInactive.src = "./images/AccuseButtonInactive.png";
accuseButtonHover.src = "./images/AccuseButtonHover.png";


// ----- Notebook -----
var notebookButton = new Image();
notebookButton.src = "./images/NotebookButton.png";


// ----- CARDS -----
var cardBack = new Image();
cardBack.src = "./images/CardBack.png";

var selectX1 = 60;
var selectSuspectY = 90;
var selectWeaponY = 190;
var selectRoomY = 290;
var closePopupY = 380;

var selectButtonHeight = 50;
var selectButtonWidth =50;
var guessButtonWidth = 75;
var selectButtonWidthAndMargin =60;




//Display Guess
var suggestion;
var resolution;
var shownCard = new Image();


function draw(){
    drawUserInterface();
    drawMap();
    drawProps();
    drawPlayer();

    if(turn == turnType.playerGuess){
        drawMakeGuess();
    }
    else if(turn == turnType.playerAccuse){
        drawMakeAccusation();
    }
    else if(turn == turnType.playerDisplayGuess || turn == turnType.oneDisplayGuess || turn == turnType.twoDisplayGuess){
        drawGuess();
    }
    else if (turn == turnType.playerWins){
        drawWin();
    }
    else if (turn == turnType.playerLoses){
        drawLose();
    }
    else if (turn == turnType.oneWins){
            drawAiWin(one);
        }
    else if (turn == turnType.twoWins){
        drawAiWin(two);
    }
}

function clear(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function drawUserInterface(){
    ctx.beginPath();
    ctx.rect(0, screenHeight, WIDTH, HEIGHT-screenHeight);
    ctx.fillStyle = '#eeeeee';
    ctx.fill();

    ctx.beginPath();
    ctx.rect(screenWidth, 0, sidebarWidth, HEIGHT);
    ctx.fillStyle = '#eeeeee';
    ctx.fill();

    drawMovementOptions();
    drawDie();
    drawNotebook();
    drawHand();
}

function drawProps(){
    for (var i = 0; i < allRooms.length; i++){
        if (allRooms[i].prop != null){
            ctx.drawImage(allRooms[i].prop, allRooms[i].propPos.x * tileSize, allRooms[i].propPos.y * tileSize);
        }
    }
}

function drawMap(){
    ctx.fillStyle = "rgba(255,0,0,0.6)";
    for (var i = 0; i < map.length; i++){
        for (var j = 0; j < map[i].length; j++){
               drawTile(tileset, singleTileSpec[map[i][j]], j,i);
        }
    }
    drawMapLabels();
}

function drawTile(sprite, singleTileSpec,x,y){
    ctx.drawImage(
        sprite,
        singleTileSpec.x, singleTileSpec.y, this.tileSize, this.tileSize, // source coords
        Math.floor(x * this.tileSize), Math.floor(y * this.tileSize), this.tileSize, this.tileSize // destination coords
  );
}

function drawMapLabels(){
    ctx.textAlign="left";
    ctx.font = "12px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText(allRooms[0].name, 32,72);
    ctx.fill();
    ctx.fillText(allRooms[1].name, 192,72);
    ctx.fill();
    ctx.fillText(allRooms[2].name, 540,72);
    ctx.fill();
    ctx.fillText(allRooms[3].name, 120,258);
    ctx.fill();
    ctx.fillText(allRooms[4].name, 364,72);
    ctx.fill();
    ctx.fillText(allRooms[5].name, 500,258);
    ctx.fill();
    ctx.fillText(allRooms[6].name, 72,438);
    ctx.fill();
    ctx.fillText(allRooms[7].name, 300,438);
    ctx.fill();
    ctx.fillText(allRooms[8].name, 500,438);
    ctx.fill();
}

function drawPlayer(){
    for (var i = 0; i < allSuspects.length; i++){
        drawTile(
            allSuspects[i].tokenImage,
            {"x": 0, "y": 0},
            allSuspects[i].x,
            allSuspects[i].y
        );
    }
}


function drawDie(){
    var diePos = [WIDTH-sidebarWidth/2-die0.width/2,  rollButtonY+64];
    ctx.drawImage(dice[dieResult], diePos[0], diePos[1]);
}

function drawEvents(){
    y= knownSuspectY1;
    x= screenWidth+10;
        
    for(var i = information.length-1; i > -1; i--){
        ctx.beginPath();
        ctx.textAlign="left";
        ctx.font = "10px Arial";
        
        var firstWord = information[i].substr(0, information[i].indexOf(' '));;
        if (firstWord == "You"){
            ctx.fillStyle = "#f33";
        }
        else if (firstWord === peacock.name){
            ctx.fillStyle = "#0af";
        }
        else if (firstWord === white.name){
            ctx.fillStyle = "#fff";
        }
        else if (firstWord == "No"){
            ctx.fillStyle = "#3f3";
        }
        
        ctx.fillText(information[i], screenWidth+15, y+5);
        ctx.fill();
        y+=14;
    }
}

function drawMovementOptions(){
    //draw Stay Button
    if(turn == turnType.playerSelectMovementType && player.character.room != null){
        if (hover == buttons.stayButton){
            ctx.drawImage(stayButtonHover, guessButtonPos[0], guessButtonPos[1]);
        }
        else{
            ctx.drawImage(stayButton, guessButtonPos[0], guessButtonPos[1]);
        }
    }
    else{
        ctx.drawImage(stayButtonInactive, guessButtonPos[0], guessButtonPos[1]);
    }

    //draw Roll Button
    if(turn == turnType.playerSelectMovementType){
        if (hover == buttons.rollButton){
            ctx.drawImage(rollButtonHover, rollButtonPos[0], rollButtonPos[1]);
        }
        else{
            ctx.drawImage(rollButton, rollButtonPos[0], rollButtonPos[1]);
        }
    }
    else{
        ctx.drawImage(rollButtonInactive, rollButtonPos[0], rollButtonPos[1]);
    }

    if(turn == turnType.playerSelectMovementType &&
       (player.character.room == conservatory || player.character.room == kitchen ||
        player.character.room == study || player.character.room == lounge)){
        if(turn == turnType.playerSelectMovementType && player.character.room != null){
            if (hover == buttons.stairsButton){
                ctx.drawImage(stairsButtonHover, stairsButtonPos[0], stairsButtonPos[1]);
            }
            else{
                ctx.drawImage(stairsButton, stairsButtonPos[0], stairsButtonPos[1]);
            }
        }
    }
    else{
        ctx.drawImage(stairsButtonInactive, stairsButtonPos[0], stairsButtonPos[1]);
    }
    
    if (turn == turnType.playerSelectMovementType || turn == turnType.playerMove){
        if (hover == buttons.accuseButton){
            ctx.drawImage(accuseButtonHover, accuseButtonPos[0], accuseButtonPos[1]);
        }
        else{
            ctx.drawImage(accuseButton, accuseButtonPos[0], accuseButtonPos[1]);
        }
    }
    else{
        ctx.drawImage(accuseButtonInactive, accuseButtonPos[0], accuseButtonPos[1]);
    }
}

function drawNotebook(){
    
    x = screenWidth+sidebarWidth/2-90;
    y = knownSuspectY1;

    for (var i = 0; i < 6; i++){
        ctx.drawImage(notebookButton,x,y);
        ctx.drawImage(allSuspects[i].icon,x,y);
        if(playerKnows.includes(allSuspects[i])){
            ctx.drawImage(markers[1],x,y);
        }
        if (i == 2){
            x = screenWidth+sidebarWidth/2-90;
            y = knownSuspectY2;
        }
        else{
            x+=60;
        }
    }

    x = screenWidth+sidebarWidth/2-90;
    y = knownWeaponY1;

    for (var i = 0; i < 6; i++){
        if(playerKnows.includes(allWeapons[i])){
            ctx.drawImage(allWeapons[i].knownImage,x,y);
            ctx.drawImage(markers[1],x,y);
        }
        else{
            ctx.drawImage(allWeapons[i].unknownImage,x,y);
        }
        if (i == 2){
            x = screenWidth+sidebarWidth/2-90;
            y = knownWeaponY2;
        }
        else{
            x+=60;
        }
    }

    x = screenWidth+sidebarWidth/2-90;
    y = knownRoomY1;
    for (var i = 0; i < 9; i++){
        ctx.drawImage(notebookButton,x,y);

        ctx.beginPath();
        ctx.textAlign="center";
        ctx.font = "9px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText(allRooms[i].name, x+25, y+25);
        if(playerKnows.includes(allRooms[i])){
            ctx.drawImage(markers[1],x,y);
        }
        if (i == 2){
            x = screenWidth+sidebarWidth/2-90;
            y = knownRoomY2;
        }
        else if (i == 5){
            x = screenWidth+sidebarWidth/2-90;
            y = knownRoomY3;
        }
        else{
            x+=60;
        }
    }
}


function drawHand(){
    var x = 0;
    for (var i = 0; i < playerHolds.length; i++){
        if (playerHolds[i].cardType == cardType.suspect){
            ctx.drawImage(playerHolds[i].card, x+6, cardsY);
        }
        else{
            ctx.beginPath();
            roundRect(ctx, x+6, cardsY, 94, 140);
            //ctx.rect(x+10, 330, 85, 140);
            ctx.fillStyle = 'white';
            ctx.fill();


            ctx.beginPath();
            ctx.textAlign="center";
            ctx.font = "12px Arial";
            ctx.fillStyle = 'black';
            ctx.fillText(playerHolds[i].name, x+50,HEIGHT-40);
            ctx.fill();
        }
        x+=108;
    }
}

function drawGuess(){
    ctx.drawImage(popup, 50, 50);
    
    ctx.font = "18px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText(suggestion, 80, 80);
    ctx.fillText(resolution, 80, 160);
    ctx.drawImage(shownCard, 80, 240);
    
    x = selectX1;
    y = closePopupY;
    ctx.drawImage(continueButton, x, y);
}

function drawSelectSuspectButtons(){
    for (var i = 0; i < allSuspects.length; i++){

        x = selectX1 + i*selectButtonWidthAndMargin;
        y = selectSuspectY;

        //If Selected
        if(selectedSuspect == allSuspects[i]){
            ctx.drawImage(selectedButton,x,y);
            ctx.drawImage(allSuspects[i].icon,x,y);
            if(playerKnows.includes(allSuspects[i])){
                ctx.drawImage(markers[1],x,y);
            }
        }
        //If not selected
        else{
            ctx.drawImage(selectButton,x,y);
            ctx.drawImage(allSuspects[i].icon,x,y);
            if(playerKnows.includes(allSuspects[i])){
                ctx.drawImage(markers[1],x,y);
            }
        }
    }
}


function drawSelectWeaponButtons(){
    for (var i = 0; i < allWeapons.length; i++){

        x = selectX1 + i*selectButtonWidthAndMargin;
        y = selectWeaponY;

        if(playerKnows.includes(allWeapons[i])){
            if(selectedWeapon == allWeapons[i]){
                ctx.drawImage(allWeapons[i].knownSelectedImage,x,y);
            }
            else{
            ctx.drawImage(allWeapons[i].knownImage,x,y);
            }
        }
        else{

            if(selectedWeapon == allWeapons[i]){
                ctx.drawImage(allWeapons[i].unknownSelectedImage,x,y);
            }
            else{
            ctx.drawImage(allWeapons[i].unknownImage,x,y);
            }
        }
    }
}

function drawSelectRoomButtons(){
    x = selectX1;
    y = selectRoomY;
    ctx.font = "18px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("Room:", x,y-18);
    for (var i = 0; i < allRooms.length; i++){
        if(selectedRoom == allRooms[i]){
            ctx.drawImage(selectedButton, x, y);
        }
        else {
            ctx.drawImage(selectButton, x, y);
        }

        ctx.font = "9px Arial";
        if(playerKnows.includes(allRooms[i])){
            ctx.fillStyle = 'grey';
        }
        else{
            ctx.fillStyle = 'black';
        }
        ctx.fillText(allRooms[i].name, x+4, y+25);
        x += 60;
    }
}

function drawMakeGuess(){
    //draw guess box background
    ctx.drawImage(popup, 50, 50);

    //draw suspect boxes
    x = selectX1;
    y = selectSuspectY;
    ctx.font = "18px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("Suspect:", x,y);
    drawSelectSuspectButtons();

    y = selectWeaponY;
    ctx.fillText("Weapon:", x,y-18);
    drawSelectWeaponButtons();


    selectedRoom = player.character.room;
    x = selectX1;
    y = selectRoomY;
    ctx.font = "18px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("Room:", x,y-18);
    ctx.beginPath();
    ctx.rect(x, y, 50, 50);
    if(playerKnows.includes(selectedRoom)){
        ctx.fillStyle = 'lightgrey';
    }
    else{
        ctx.fillStyle = 'white';
    }
    ctx.fill();

    ctx.font = "9px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText(selectedRoom.name, x+4, y+25);
    x += 60;

    //draw guess button
    x = selectX1;
    y = closePopupY;
    ctx.beginPath();
    ctx.rect(x, y, guessButtonWidth, selectButtonHeight);
    ctx.fillStyle = 'steelblue';
    ctx.fill();

    ctx.font = "12px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText("Guess!", x+8, y+25);
}

function drawMakeAccusation(){
    //draw guess box background
    ctx.drawImage(popup, 50, 50);
    
    //draw suspect boxes
    x = selectX1;
    y = selectSuspectY;
    ctx.font = "18px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("Suspect:", x,y-18);
    drawSelectSuspectButtons();
    drawSelectWeaponButtons();
    drawSelectRoomButtons();
    
    //draw Accuse button
    x = selectX1;
    y = closePopupY;
    ctx.drawImage(accuseButton, x, y);
    
    //draw Cancel button
    x += accuseButton.width + 10;
    ctx.drawImage(cancelButton, x, y);
}

//End Game
function drawSolution(x, y){
    y += 100;
    ctx.fillText("The solution was:", x,y);
    y += 34;
    x += 12;
    ctx.font = "24px Arial";
    ctx.fillText("Suspect: " + solutionSuspect.name, x,y);
    y += 30;
    ctx.fillText("Weapon: " + solutionWeapon.name, x,y);
    y += 30;
    ctx.fillText("Room: " + solutionRoom.name, x,y);
}

function drawEndGame(msg){
    ctx.drawImage(popup, 50, 50);

    x = selectX1;
    y = selectSuspectY;

    ctx.font = "32px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText(msg, x, y);
    
    drawSolution(x,y);
}

function drawWin(){
    drawEndGame("You solved the mystery! You win!");
}

function drawLose(){
    drawEndGame("You were wrong. You lose!");
}

function drawAiWin(ai){
    drawEndGame(ai.character.name + "Wins!");
}


//Helpers
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
