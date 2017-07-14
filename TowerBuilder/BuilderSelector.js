class BuilderSelector{
    constructor(player){
        this.x1 = player.builder1.x;
        this.y1 = player.builder1.y;
        this.x2 = player.builder2.x;
        this.y2 = player.builder2.y;
        this.player = player;
    }
    
    onMouseMove(){
        c.style.cursor = "default";
        
        if (this.player.builder1.canMove()){
            this.highlightPlayer(this.x1, this.y1);
        }
        if (this.player.builder2.canMove()){
            this.highlightPlayer(this.x2, this.y2);
        }
    }
    
    highlightPlayer(x, y){
        var builderCell = board.board[x][y];
        if (cellClicked(x,y)) {
            builderCell[builderCell.length-1] = this.player.waveSprite;
            builderCell[0] = "./images/groundHighlighted.png";
            c.style.cursor = "pointer";
        }
        else{
             builderCell[builderCell.length-1] = this.player.sprite;
            builderCell[0] = 0;
        }
    }
    
    onClick(){
        var builder = null
        if (this.checkClickedBuilder(this.x1, this.y1) &&
            this.player.builder1.canMove()){
                builder = this.player.builder1;
        }
        else if (this.checkClickedBuilder(this.x2, this.y2) &&
            this.player.builder2.canMove()){
                builder = this.player.builder2;
        }
        if (builder){
            //select builder
            builder.active = true;
            var builderCell = board.board[builder.x][builder.y];
            builderCell[builderCell.length-1] = this.player.walkSprite;
            //advance gamestate
            gameStateManager.advancePhase();
        }
    }
    
    checkClickedBuilder(x, y){
        if (cellClicked(x,y)){
            return true;
        }
        return false;
    }
    
    
}