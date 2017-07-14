class Builder{
    constructor(x, y, sprite){
        this.active = false;
        this.x = x;
        this.y = y;
        this.level = 1;
        this.sprite = sprite;
        board.board[this.x][this.y].push(this.sprite);
    }
    
    selectBuilder(){
        this.active = true;
    }
    
    findAvailableMoves(){
        var availableMoves = [];
        for (var destX = this.x-1; destX <= this.x+1; destX++){
            for (var destY = this.y-1; destY <= this.y+1; destY++){
               if(board.isOnMap(destX, destY) &&
                  board.isUnoccupied(destX, destY) &&
                  board.isClimbable(destX, destY, this.level) &&
                  !board.isRoofed(destX, destY)){
                    availableMoves.push({"x": destX, "y": destY});
               } 
            }
        }
        return availableMoves;
    }
    
    canMove(){
        var moves = this.findAvailableMoves();
        return (moves.length > 0);
    }
    
    moveToLocation(x, y){
    
    }
    
    findAvailableBuilds(){
        var availableBuilds = [];
        for (var x = this.x-1; x <= this.x+1; x++){
            for (var y = this.y-1; y <= this.y+1; y++){
                if(board.isOnMap(x, y) &&
                  board.isUnoccupied(x, y) &&
                  !board.isRoofed(x, y)){
                    availableBuilds.push({"x": x, "y": y});
                }   
            }
        }
        return availableBuilds;
    }
    
    setInactive(){
        this.active = false;
    }
}