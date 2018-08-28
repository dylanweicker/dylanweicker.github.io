var boardYOffset = 150;

class Drawer{
    
    constructor(){
        //size of grid is 2:1
        this.gridWidth = 132;
        this.gridHeight = 66;
        
        this.mapTiles = [
            "./images/ground.png", //0 = ground
            "./images/base.png",   //1 = base
            "./images/middle.png", //2 = middle
            "./images/top.png",    //3 = top
            "./images/roof.png",   //4 = roof
            "./images/greenPlayer.png", //5 = green
            "./images/redPlayer.png"    //6 = red
        ];
        
        this.levelHeights = [
            0,
            42,
            75,
            111,
            149
        ];
        
        this.rotLeftHovered = false;
        this.rotLeft = new Image();
        this.rotLeftHover = new Image();
        this.rotLeft.src = "./images/rotLeft.png";
        this.rotLeftHover.src = "./images/rotLeftHover.png";
        this.rotLeftXMargin = 80;
        this.rotLeftYMargin = c.height-140;
        
        this.rotRightHovered = false;
        this.rotRight = new Image();
        this.rotRightHover = new Image();
        this.rotRight.src = "./images/rotright.png";
        this.rotRightHover.src = "./images/rotrightHover.png";
        this.rotRightXMargin = c.width - 80 - this.rotLeftXMargin;
        this.rotRightYMargin = this.rotLeftYMargin;

        this.phaseX = 80;
        this.phaseY = 80;
        this.phaseColor = "green";
        this.phaseText = "";
    }
    
    draw(){
        this.drawBoard();
        this.drawRotateButtons();
        this.drawPhase();
    } 
    
    drawBoard(){
        for(var x = 0; x < board.boardWidth; x++) {
           for(var y = 0; y < board.boardHeight; y++) {
               let cell =  board.board[x][y];
               for(var level = 0;  level < cell.length; level++){
                    var sprite = new Image();
                    sprite.src = this.decodeSpriteSrc(cell[level]);
                    this.drawSprite(x, y, level, sprite);
               }
           }
        }
    }
    
    decodeSpriteSrc(spriteData){
        if (typeof spriteData === "number"){
            return this.mapTiles[spriteData]
        }
        else{
            return spriteData;
        }
    }

    drawSprite(x, y, level, sprite, offset) {
        //x offset is center - width of half of width of sprite
        var ox = this.getXOffset();
        
        //y offset is height of sprite - level offset + board offset
        var oy = this.getYOffset(sprite, level);

        //draw sprite on ctx
        ctx.drawImage(sprite,
                     this.getXPosition(x,y),
                     this.getYPosition(x, y, sprite, level),
                     sprite.width,
                     sprite.height);
    }
    
    getCellCenter(x,y){
        var ox = c.width/2;
        var oy = boardYOffset;
        
        //centerX = ox + (x-y) * 
    }
        
        
    getXOffset(){
        return c.width/2 - this.gridWidth/2;
    }
    getXPosition(x, y){
        return this.getXOffset() + (x - y) * this.gridWidth/2; 
    }
    getYOffset(sprite, level){
        return boardYOffset + sprite.height/2 - this.levelHeights[level];
    }
    getYPosition(x, y, sprite, level){
        return this.getYOffset(sprite, level) + (y + x) * this.gridHeight/2 - (sprite.height-this.gridHeight)
    }
    getCenterCoordinates(x,y){
        var centerX = this.getXPosition(x,y) + this.gridWidth/2;
        var centerY = this.getYPosition(x, y, new Image(), 1) + this.gridHeight/2;
        return {"x": centerX, "y": centerY};
    }
    
    drawRotateButtons(){
        var rotLeftButton = this.rotLeftHovered ? this.rotLeftHover : this.rotLeft;
        ctx.drawImage(rotLeftButton,
                      this.rotLeftXMargin,
                      this.rotLeftYMargin,
                      rotLeftButton.width,
                      rotLeftButton.height);
    
        var rotRightButton = this.rotRightHovered ? this.rotRightHover : this.rotRight;
        ctx.drawImage(rotRightButton,
                      this.rotRightXMargin,
                      this.rotRightYMargin,
                      rotRightButton.width,
                      rotRightButton.height);
    }

    setPhase(turn, phase, state){
        let playerName = "";
        
        if (turn == player1){
            this.phaseX = 80;
            this.phaseColor = "green";
            playerName = "Green";
        }
        else{
            this.phaseX = 500;
            this.phaseColor = "red";
            playerName = "Red";
        }
        
        if (state == states.play){
            if (phase == 0){
                this.phaseText = "Select Builder";
            }
            else if(phase == 1){
                this.phaseText = "Move";
            }
            else if(phase == 2){
                this.phaseText = "Build";
            }
        }
        else if (state == states.win){
                this.phaseText = playerName + " wins!";
        }
    }

    drawPhase(){
        ctx.fillStyle = this.phaseColor;
        ctx.font = "30px Arial";
        ctx.fillText(this.phaseText, this.phaseX, this.phaseY); 
    }
    
}