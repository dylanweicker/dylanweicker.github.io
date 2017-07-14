var drawer;
var board;

var c;
var ctx;

var frames = 15;
var timerId = 0;

var players;

var gameStateManager;

var mouseX;
var mouseY;

var greenSprites = {idle: "./images/greenPlayer.png",
                    wave: "./images/greenPlayerWave.png",
                    walk: "./images/greenPlayerWalk.png"}

var redSprites =   {idle: "./images/redPlayer.png",
                    wave: "./images/redPlayerWave.png",
                    walk: "./images/redPlayerWalk.png"}

function main(){
    
    c = document.getElementById("canvas");
    c.width = 800; 
    c.height = 600;
    ctx = c.getContext("2d");
    c.addEventListener("mousemove", checkPos);
    c.addEventListener("mouseup", onClick);
    c.addEventListener("keypress", handleKey);
    
    drawer = new Drawer();
    board = new Board();
    player1 = new Player(0,2,2,3,greenSprites);
    player2 = new Player(4,2,2,1, redSprites);
    players = [player1, player2];
    gameStateManager = new GameStateManager(drawer);
    
    
    timerId = setInterval(update, 1000/frames);
    loadSprites();
}

function clear(){
    ctx.clearRect(0, 0, c.width, c.height);
}

function update() {
    clear();
    drawer.draw();
}

function checkPos(mouseEvent){
    mouseX = mouseEvent.pageX;
    mouseY = mouseEvent.pageY;
    hover = null;
    gameStateManager.onMouseMove();
}

function onClick(mouseEvent){
    mouseX = mouseEvent.pageX;
    mouseY = mouseEvent.pageY;
    hover = null;
    gameStateManager.onClick();
}

function loadSprites(){
    var image = new Image();
    image.src = "./images/groundHighlighted.png";
    ctx.drawImage(image, c.width, c.height, 0, 0);
}