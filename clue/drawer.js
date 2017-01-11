var HEIGHT = 680;
var WIDTH = 900;
var screenHeight = 480;
var screenWidth = 648;
var sidebarWidth = WIDTH-screenWidth;

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
var rollButtonY = 16;
var diePos = [WIDTH-sidebarWidth/2-25, rollButtonY+90];
var accuseButtonY = 190;
var accuseButtonWidth = 92;

var rollButtonPos = [screenWidth + 16, rollButtonY];
var stairsButtonPos = [WIDTH - accuseButtonWidth - 16, rollButtonY];
var guessButtonPos = [screenWidth + 16, accuseButtonY];
var accuseButtonPos = [WIDTH - accuseButtonWidth - 16, accuseButtonY];

//Roll die
var rollButton = new Image();
var rollButtonInactive = new Image();
var rollButtonHover = new Image();
rollButton.src = "./images/rollbutton.png";
rollButtonInactive.src = "./images/rollbuttoninactive.png";
rollButtonHover.src = "./images/rollbuttonHover.png";

//Use Secret Passage
var stairsButton = new Image();
var stairsButtonInactive = new Image();
var stairsButtonHover = new Image();
stairsButton.src = "./images/PassageButton.png";
stairsButtonInactive.src = "./images/PassageButtonInactive.png";
stairsButtonHover.src = "./images/PassageButtonHover.png";

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

//Navigation
var upEnabled;
var downEnabled;
var leftEnabled;
var rightEnabled;

var moveUp = new Image();
var moveDown = new Image();
var moveLeft = new Image();
var moveRight = new Image();
var moveUpDisabled = new Image();
var moveDownDisabled = new Image();
var moveLeftDisabled = new Image();
var moveRightDisabled = new Image();
moveUp.src = "images/MoveUp.png";
moveDown.src = "images/MoveDown.png";
moveLeft.src = "images/MoveLeft.png";
moveRight.src = "images/MoveRight.png";
moveUpDisabled.src = "images/MoveUpDisabled.png";
moveDownDisabled.src = "images/MoveDownDisabled.png";
moveLeftDisabled.src = "images/MoveLeftDisabled.png";
moveRightDisabled.src = "images/MoveRightDisabled.png";
var navLength = 38;
var navWidth = 28;
var moveUpPos = [diePos[0]  + 10, diePos[1] - navLength - 8];
var moveDownPos = [diePos[0] + 10, diePos[1] + 53];
var moveLeftPos = [diePos[0] - navLength - 8, diePos[1] + 8];
var moveRightPos = [diePos[0] + 58, diePos[1] + 8];


// ----- Notebook -----
var notebookButton = new Image();
notebookButton.src = "./images/NotebookButton.png";
var notebookButtonHand = new Image();
notebookButtonHand.src = "./images/NotebookButtonHand.png";
var notebookButtonDisproved = new Image();
notebookButtonDisproved.src = "./images/NotebookButtonDisproved.png";
var notebookMargin = 60;
var notebookX = screenWidth+sidebarWidth/2-90;
var notebookSuspectY = 255;
var notebookWeaponY = notebookSuspectY+120;
var notebookRoomY = notebookWeaponY+120;

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
    drawCharacters();
    drawMapLabels();
    drawNavigation();

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
    ctx.fillStyle = "#111144";
    ctx.fillText(allRooms[0].name, 32,72);
    ctx.fillText(allRooms[1].name, 192,72);
    ctx.fillText(allRooms[2].name, 540,72);
    ctx.fillText(allRooms[3].name, 120,236);
    ctx.fillText(allRooms[4].name, 364,72);
    ctx.fillText(allRooms[5].name, 500,258);
    ctx.fillText(allRooms[6].name, 72,438);
    ctx.fillText(allRooms[7].name, 300,438);
    ctx.fillText(allRooms[8].name, 500,438);
}

function drawCharacters(){
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
    ctx.drawImage(dice[dieResult], diePos[0], diePos[1]);
}

function checkNavigation(){
    var playerMove = (turn == turnType.playerMove);
    var inCorridor = (player.character.room == null);
    var x = player.character.x;
    var y = player.character.y;
    
    upEnabled = (playerMove && ((inCorridor && canWalkHere(x, y-1)) || player.character.room == dining || player.character.room == lounge || player.character.room == hall));
    downEnabled = (playerMove &&  ((inCorridor && canWalkHere(x, y+1)) || player.character.room == ballroom || player.character.room == conservatory || player.character.room == billiards || player.character.room == library || player.character.room == study));
    leftEnabled = (playerMove && ((inCorridor && canWalkHere(x-1, y)) || player.character.room == hall));
    rightEnabled = (playerMove && ((inCorridor && canWalkHere(x+1, y)) || player.character.room == ballroom || player.character.room == kitchen));
}

function drawNavigation(){
    checkNavigation();
    
    if (upEnabled){
        ctx.drawImage(moveUp, moveUpPos[0], moveUpPos[1]);
    }
    else{
        ctx.drawImage(moveUpDisabled, moveUpPos[0], moveUpPos[1]);  
    }
    
    if (downEnabled){
        ctx.drawImage(moveDown, moveDownPos[0], moveDownPos[1]);
    }
    else{
        ctx.drawImage(moveDownDisabled, moveDownPos[0], moveDownPos[1]);
    }
    
    if (leftEnabled){
        ctx.drawImage(moveLeft, moveLeftPos[0], moveLeftPos[1]);
    }
    else{
        ctx.drawImage(moveLeftDisabled, moveLeftPos[0], moveLeftPos[1]);
    }
    
    if (rightEnabled){
        ctx.drawImage(moveRight, moveRightPos[0], moveRightPos[1]);
    }
    else{
        ctx.drawImage(moveRightDisabled, moveRightPos[0], moveRightPos[1]);
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

function drawNotebookSection(x0, y0, arr){
    x = x0;
    y = y0;

    for (var i = 0; i < arr.length; i++){
        //drawbutton
        /*if(playerHolds.includes(arr[i])){
            ctx.drawImage(notebookButtonHand,x,y);
        }
        else*/ if (playerKnows.includes(arr[i])){
            ctx.drawImage(notebookButtonDisproved,x,y);
        }
        else{
            ctx.drawImage(notebookButton,x,y);
        }
        
        //draw icon
        if (arr[i].icon != null){
            ctx.drawImage(arr[i].icon, x, y);
        }
        else{
            ctx.font = "10px Arial";
            ctx.fillStyle = 'black';
            var lines = getLines(ctx, arr[i].name, 50)
            for (var j = 0; j < lines.length; j++){
                ctx.fillText(lines[j], x+6, y+25 + j*10);
            }
        }
        
        //draw marker        
        if(arr[i].marker != null){
            ctx.drawImage(markers[arr[i].marker],x,y);
        }
        if(hover == arr[i]){
            if (arr[i].marker == 0){
            ctx.drawImage(markerHoverBack,x,y);
            }
            else{
                ctx.drawImage(markerHover,x,y);
            }
        }
        
        //iterate
        if (i == 2 || i == 5){
            x = x0;
            y += notebookMargin;
        }
        else{
            x+= notebookMargin;
        }
    }
}

function drawNotebook(){
    x = notebookX;
    y = notebookSuspectY;
    drawNotebookSection(x, y, allSuspects);
    
    y = notebookWeaponY;
    drawNotebookSection(x, y, allWeapons);
    
    y = notebookRoomY;
    drawNotebookSection(x, y, allRooms);
}


function drawHand(){
    var x = 16;
    for (var i = 0; i < playerHolds.length; i++){
        if (playerHolds[i].cardType == cardType.suspect || playerHolds[i].cardType == cardType.weapon || playerHolds[i] == ballroom || playerHolds[i] == library){
            ctx.drawImage(playerHolds[i].card, x, cardsY);
        }
        else{
            ctx.beginPath();
            roundRect(ctx, x, cardsY, 94, 128);
            //ctx.rect(x+10, 330, 85, 140);
            ctx.fillStyle = 'white';
            ctx.fill();


            ctx.beginPath();
            ctx.textAlign="center";
            ctx.font = "12px Arial";
            ctx.fillStyle = 'black';
            ctx.fillText(playerHolds[i].name, x+50, cardsY+102);
            ctx.fill();
        }
        x+=104;
    }
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

function drawGuess(){
    //draw background
    ctx.drawImage(popup, 50, 50);
    
    x = 80;
    y = 80;
    ctx.font = "18px Arial";
    ctx.fillStyle = 'black';
    var lines = getLines(ctx, suggestion, popup.width-2*x);
    for (var i = 0; i < lines.length; i++){
        ctx.fillText(lines[i], x, y);
        y+=20;
    }
    
    //draw resolution of guess
    ctx.fillText(resolution, x, 160);
    ctx.drawImage(shownCard, (screenWidth - shownCard.width)/2, 240);
    
    //draw continue button;
    x = selectX1;
    y = closePopupY;
    ctx.drawImage(continueButton, x, y);
}

function drawSelectSuspectButtons(){
    for (var i = 0; i < allSuspects.length; i++){

        x = selectX1 + i*selectButtonWidthAndMargin;
        y = selectSuspectY;

        //Draw Button background
        if(selectedSuspect == allSuspects[i]){
            ctx.drawImage(selectedButton,x,y);
        }
        
        else{
            ctx.drawImage(selectButton,x,y);
        }
        
        //Draw icon
        ctx.drawImage(allSuspects[i].icon,x,y);
        
        //Draw marker
        if(allSuspects[i].marker != null){
            ctx.drawImage(markers[allSuspects[i].marker],x,y);
        }
    }
}


function drawSelectWeaponButtons(){
    for (var i = 0; i < allWeapons.length; i++){

        x = selectX1 + i*selectButtonWidthAndMargin;
        y = selectWeaponY;

        //Draw Button background
        if(selectedWeapon == allWeapons[i]){
            ctx.drawImage(selectedButton,x,y);
        }
        else{
            ctx.drawImage(selectButton,x,y);
        }
        
        //Draw icon
        ctx.drawImage(allWeapons[i].icon,x,y);
        
        //Draw marker
        if(allWeapons[i].marker != null){
            ctx.drawImage(markers[allWeapons[i].marker],x,y);
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
