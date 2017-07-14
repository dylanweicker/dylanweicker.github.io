class BuilderMover{
    constructor(player){
        this.activeBuilder = player.builder1.active? player.builder1 : player.builder2 
        this.player = player;
    }
    
    onMouseMove(){
        c.style.cursor = "default";
        var availableMoves = this.activeBuilder.findAvailableMoves();
        
        for (var i = 0; i < availableMoves.length; i++){
            this.highlightMoveableTile(availableMoves[i].x, availableMoves[i].y);
        }
    }
    
    highlightMoveableTile(x, y){
        var moveableCell = board.board[x][y];
        
        if (cellClicked(x,y)) {
            moveableCell[0] = "./images/groundHighlighted.png";
            c.style.cursor = "pointer";
        }
        else{
            moveableCell[0] = 0;
        }
    }
        
    onClick(){
        var availableMoves = this.activeBuilder.findAvailableMoves();
        
        for (var i = 0; i < availableMoves.length; i++){
            var x = availableMoves[i].x;
            var y = availableMoves[i].y;
            if (this.checkClickedValidTile(x, y)){
                this.onClickedValidTile(x, y);
                break;
            }
        }
    }
    
    checkClickedValidTile(x, y){
        return cellClicked(x,y);
    }
    
    onClickedValidTile(x,y){
        this.removeBuilder();
        this.moveBuilder(x, y);
        gameStateManager.advancePhase();
    }
    
    removeBuilder(){
        var x = this.activeBuilder.x;
        var y = this.activeBuilder.y;
        board.board[x][y].pop();
        board.setGroundToDefault(x, y);
    }
    
    moveBuilder(x, y){
        this.activeBuilder.x = x;
        this.activeBuilder.y = y;
        this.activeBuilder.level = board.board[x][y].length;
        board.board[x][y].push(this.activeBuilder.sprite);
    }

}