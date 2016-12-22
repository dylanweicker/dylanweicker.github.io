var HEIGHT = 650;
var WIDTH = 854;
var screenHeight = 480;
var screenWidth = 648;
var sidebarWidth = WIDTH-screenWidth;
var mapRowLength = 27;

var selectButtonHeight = 50;
var selectButtonWidth =50;
var guessButtonWidth = 75;
var selectButtonWidthAndMargin =60;

var knownSuspectY1 = 250;
var knownSuspectY2 = knownSuspectY1+50;

var knownWeaponY1 = knownSuspectY2+60;
var knownWeaponY2 = knownWeaponY1+50;

var knownRoomY1 = knownWeaponY2+60;
var knownRoomY2 = knownRoomY1+50;
var knownRoomY3 = knownRoomY2+50;

var cardsY = HEIGHT-155;

var tileSize = 24;

var rollButton = new Image();
var rollButtonInactive = new Image();
var rollButtonHover = new Image();
rollButton.src = "./images/rollbutton.png";
rollButtonInactive.src = "./images/rollbuttonInactive.png";
rollButtonHover.src = "./images/rollbuttonHover.png";

var stayButton = new Image();
var stayButtonInactive = new Image();
var stayButtonHover = new Image();
stayButton.src = "./images/staybutton.png";
stayButtonInactive.src = "./images/staybuttoninactive.png";
stayButtonHover.src = "./images/stayButtonHover.png";

var stairsButton = new Image();
var stairsButtonInactive = new Image();
var stairsButtonHover = new Image();
stairsButton.src = "./images/stairsbutton.png";
stairsButtonInactive.src = "./images/stairsbuttoninactive.png";
stairsButtonHover.src = "./images/stairsButtonHover.png";

var accuseButton = new Image();
var accuseButtonInactive = new Image();
var accuseButtonHover = new Image();
accuseButton.src = "./images/accuseButton.png";
accuseButtonInactive.src = "./images/accuseButtonInactive.png";
accuseButtonHover.src = "./images/accuseButtonHover.png";

var notebookButton = new Image();
var notebookButtonSelected = new Image();
var notebookButtonHover = new Image();
notebookButton.src = "./images/notebookButton.png";
notebookButtonSelected.src = "./images/notebookButtonSelected.png";
notebookButtonHover.src = "./images/notebookButtonHover.png";

var eventsButton = new Image();
var eventsButtonSelected = new Image();
var eventsButtonHover = new Image();
eventsButton.src = "./images/eventsButton.png";
eventsButtonSelected.src = "./images/eventsButtonSelected.png";
eventsButtonHover.src = "./images/eventsButtonHover.png";

function draw(){
    drawUserInterface();
    drawMap();
    drawPlayer();

    if(turn == turnType.playerGuess){
        drawMakeGuess();
    }
    else if(turn == turnType.playerAccuse){
        drawMakeAccusation();
    }
    else if (turn == turnType.playerWins){
            drawWin();
        }
    else if (turn == turnType.playerLoses){
            drawLose();
        }
}

function clear(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function drawUserInterface(){
    ctx.beginPath();
    ctx.rect(0, screenHeight, WIDTH, HEIGHT-screenHeight);
    ctx.fillStyle = 'grey';
    ctx.fill();

    ctx.beginPath();
    ctx.rect(screenWidth, 0, sidebarWidth, HEIGHT);
    ctx.fillStyle = 'grey';
    ctx.fill();

    drawMovementOptions();
    drawDie();
    drawTabs();
    if (tab == tabType.notebook){
        drawNotebook();
    }
    else{
        drawEvents();
    }
    drawHand();
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
    ctx.beginPath();
    ctx.textAlign="center";
    ctx.font = "36px Arial";
    if(turn == turnType.playerMove){
        ctx.fillStyle = 'black';
    }
    else{
        ctx.fillStyle = '#555555';
    }
    ctx.fillText(dieResult, WIDTH-sidebarWidth/2, rollButtonY+90);
    ctx.fill();
}

function drawEvents(){
    y= knownSuspectY1;
    x= screenWidth+10;
    for(var i = information.length-1; i > -1; i--){
        ctx.beginPath();
        ctx.textAlign="left";
        ctx.font = "10px Arial";
        ctx.fillStyle = 'white';
        ctx.fillText(information[i], screenWidth+15, y+5);
        ctx.fill();
        y+=14;
    }
}

function drawMovementOptions(){
    //draw Stay Button
    if(turn == turnType.playerSelectMovementType && player.room != null){
        if (hover == buttons.stayButton){
            ctx.drawImage(stayButtonHover, screenWidth + 10, stayButtonY);
        }
        else{
            ctx.drawImage(stayButton, screenWidth + 10, stayButtonY);
        }
    }
    else{
        ctx.drawImage(stayButtonInactive, screenWidth + 10, stayButtonY);
    }

    //draw Roll Button
    if(turn == turnType.playerSelectMovementType){
        if (hover == buttons.rollButton){
            ctx.drawImage(rollButtonHover, screenWidth + sidebarWidth/2 - rollButton.width/2, rollButtonY);
        }
        else{
            ctx.drawImage(rollButton, screenWidth + sidebarWidth/2 - rollButton.width/2, rollButtonY);
        }
        if (hover == buttons.accuseButton){
            ctx.drawImage(accuseButtonHover, screenWidth + sidebarWidth/2 - accuseButton.width/2, accuseButtonY);
        }
        else{
            ctx.drawImage(accuseButton, screenWidth + sidebarWidth/2 - accuseButton.width/2, accuseButtonY);
        }

    }
    else{
    ctx.drawImage(rollButtonInactive, screenWidth + sidebarWidth/2 - rollButtonInactive.width/2, rollButtonY);
        ctx.drawImage(accuseButtonInactive, screenWidth + sidebarWidth/2 - accuseButton.width/2, accuseButtonY);
    }

        if(turn == turnType.playerSelectMovementType &&
           (player.room == conservatory || player.room == kitchen ||
            player.room == study || player.room == lounge)){
            if(turn == turnType.playerSelectMovementType && player.room != null){
                if (hover == buttons.stairsButton){
                    ctx.drawImage(stairsButtonHover, WIDTH - 10 - stairsButton.width, stayButtonY);
                }
                else{
                    ctx.drawImage(stairsButton, WIDTH - 10 - stairsButton.width, stayButtonY);
                }
            }
        }
        else{
            ctx.drawImage(stairsButtonInactive, WIDTH - 10 - stairsButtonInactive.width, stayButtonY);
        }
}

function drawTabs(){

    ctx.beginPath();
    ctx.fillStyle = "#a3a3a3";
    roundRect(ctx, screenWidth+5, tabsY + notebookButton.height - 7, sidebarWidth - 10, HEIGHT - tabsY - notebookButton.height - 7, 5, true, false);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#3b3b3b";
    roundRect(ctx, screenWidth+10, tabsY + notebookButton.height - 2, sidebarWidth - 20, HEIGHT - tabsY - notebookButton.height - 17, 5, true, false);
    ctx.fill();

    if (tab == tabType.notebook){
        ctx.drawImage(notebookButtonSelected, notebookTabX, tabsY);
    }
    else{
        if (hover == buttons.notebookButton){
            ctx.drawImage(notebookButtonHover, notebookTabX, tabsY);
        }
        else{
            ctx.drawImage(notebookButton, notebookTabX, tabsY);
        }
    }

    if (tab == tabType.events){
        ctx.drawImage(eventsButtonSelected, eventsTabX, tabsY);
    }
    else{
        if (hover == buttons.eventsButton){
            ctx.drawImage(eventsButtonHover, eventsTabX, tabsY);
        }
        else{
            ctx.drawImage(eventsButton, eventsTabX, tabsY);
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

function drawSelectSuspectButtons(){
    for (var i = 0; i < allSuspects.length; i++){

        x = selectX1 + i*selectButtonWidthAndMargin;
        y = selectSuspectY;

        if(playerKnows.includes(allSuspects[i])){
            if(selectedSuspect == allSuspects[i]){
                ctx.drawImage(allSuspects[i].knownSelectedImage,x,y);
            }
            else{
            ctx.drawImage(allSuspects[i].knownImage,x,y);
            }
        }
        else{

            if(selectedSuspect == allSuspects[i]){
                ctx.drawImage(allSuspects[i].unknownSelectedImage,x,y);
            }
            else{
            ctx.drawImage(allSuspects[i].unknownImage,x,y);
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

function drawNotebook(){
    x = screenWidth+sidebarWidth/2-75;
    y = knownSuspectY1;

    for (var i = 0; i < 3; i++){
        if(playerKnows.includes(allSuspects[i])){
            ctx.drawImage(allSuspects[i].knownImage,x,y);
        }
        else{
            ctx.drawImage(allSuspects[i].unknownImage,x,y);
        }
        x = x+50;
    }

    x = screenWidth+sidebarWidth/2-75;
    y = knownSuspectY2;

    for (var i = 3; i < 6; i++){
        if(playerKnows.includes(allSuspects[i])){
            ctx.drawImage(allSuspects[i].knownImage,x,y);
        }
        else{
            ctx.drawImage(allSuspects[i].unknownImage,x,y);
        }
        x = x+50;
    }

    x = screenWidth+sidebarWidth/2-75;
    y = knownWeaponY1;

    for (var i = 0; i < 3; i++){
        if(playerKnows.includes(allWeapons[i])){
            ctx.drawImage(allWeapons[i].knownImage,x,y);
        }
        else{
            ctx.drawImage(allWeapons[i].unknownImage,x,y);
        }
        x = x+50;
    }

    x = screenWidth+sidebarWidth/2-75;
    y = knownWeaponY2;

    for (var i = 3; i < 6; i++){
        if(playerKnows.includes(allWeapons[i])){
            ctx.drawImage(allWeapons[i].knownImage,x,y);
        }
        else{
            ctx.drawImage(allWeapons[i].unknownImage,x,y);
        }
        x = x+50;
    }

    x = screenWidth+sidebarWidth/2-75;
    y = knownRoomY1;
    for (var i = 0; i < 3; i++){

        ctx.beginPath();
        ctx.rect(x, y, 50, 50);

        if(playerKnows.includes(allRooms[i])){
            ctx.fillStyle = 'lightgrey';
        }
        else{
            ctx.fillStyle = 'white';
        }
        ctx.fill();

        ctx.beginPath();
        ctx.textAlign="center";
        ctx.font = "9px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText(allRooms[i].name, x+25, y+25);

        x = x+50;
    }

    x = screenWidth+sidebarWidth/2-75;
    y = knownRoomY2;
    for (var i = 3; i < 6; i++){

        ctx.beginPath();
        ctx.rect(x, y, 50, 50);

        if(playerKnows.includes(allRooms[i])){
            ctx.fillStyle = 'lightgrey';
        }
        else{
            ctx.fillStyle = 'white';
        }
        ctx.fill();

        ctx.beginPath();
        ctx.textAlign="center";
        ctx.font = "9px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText(allRooms[i].name, x+25, y+25);

        x = x+50;
    }

    x = screenWidth+sidebarWidth/2-75;
    y = knownRoomY3;
    for (var i = 6; i < 9; i++){

        ctx.beginPath();
        ctx.rect(x, y, 50, 50);

        if(playerKnows.includes(allRooms[i])){
            ctx.fillStyle = 'lightgrey';
        }
        else{
            ctx.fillStyle = 'white';
        }
        ctx.fill();

        ctx.beginPath();
        ctx.textAlign="center";
        ctx.font = "9px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText(allRooms[i].name, x+25, y+25);

        x = x+50;
    }
}

function drawWin(){
    ctx.beginPath();
    ctx.rect(50, 50, HEIGHT-100, HEIGHT-260);
    ctx.fillStyle = '#f1f1d4';
    ctx.fill();

    x = selectX1;
    y = selectSuspectY;

    ctx.font = "32px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("You solved the mystery! You win!", x,y-18);
}

function drawLose(){
    ctx.beginPath();
    ctx.rect(50, 50, HEIGHT-100, HEIGHT-260);
    ctx.fillStyle = '#f1f1d4';
    ctx.fill();

    x = selectX1;
    y = selectSuspectY;

    ctx.font = "32px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("You were wrong. You lose!", x,y);
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
    ctx.fillText("Suspect:", x,y);
    drawSelectSuspectButtons();

    y = selectWeaponY;
    ctx.fillText("Weapon:", x,y-18);
    drawSelectWeaponButtons();


    selectedRoom = player.room;
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
    y = guessY;
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
    drawSelectWeaponButtons();

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
    ctx.fillText("Accuse!", x+8, y+25);
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
