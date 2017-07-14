class Board{
    constructor(){
        this.boardHeight = 5;
        this.boardWidth = 5;
        this.board = this.createEmptyBoard(this.boardHeight, this.boardWidth);
    }

    createEmptyRow(width){
        var row = [];
        for (var i = 0; i < width; i++){
            row.push([0]);
        }
        return row;
    }

    createEmptyBoard(height, width){
        var board = [];
        for (var i = 0; i < height; i++){
            board.push(this.createEmptyRow(width));
        }
        return board;
    }

    isUnoccupied(x, y){
        var result = true;
        for (var p = 0; p < players.length; p++){
            if (players[p].builder1.x == x && players[p].builder1.y == y ||
                players [p].builder2.x == x && players[p].builder2.y == y){
                result = false;
            }
        }
        return result;
    }
    
    isOnMap(x,y){
        if (x < 0 || x >= board.boardWidth ||
            y < 0 || y >= board.boardHeight){
            return false;
        }
        return true;
    }

    isClimbable(x, y, builderLevel){
        return board.board[x][y].length <= builderLevel+1;
    }

    isRoofed(x, y){
        return board.board[x][y].includes(4);
    }
    
    setGroundToDefault(x,y){
        this.board[x][y][0] = 0;
    }
    
    removeHighlights(){
        for (var i = 0; i < this.boardWidth; i++){
            for (var j = 0; j < this.boardHeight; j++){
                this.board[i][j][0] = 0;
            }
        }
    }
    
    buildAtLocation(x, y){
        var cell = this.board[x][y];
        if (cell.length < 4){
            cell.push(cell.length);
        }
        else{
            cell[cell.length-1] = cell.length;
        }
    }
    
    rotateClockwise(){
        var n = this.boardWidth;
        var newBoard = this.createEmptyBoard(n, n);
        for (var i = 0; i < n; ++i) {
            for (var j = 0; j < n; ++j) {
                newBoard[i][j] = this.board[j][n - i - 1];
            }
        }
        this.board = newBoard;
        for (var p = 0; p < players.length; p++){
            this.rotateBuilder(players[p].builder1);
            this.rotateBuilder(players[p].builder2);
        }
    }
    
    rotateBuilder(builder){
        var n = this.boardWidth;
        var x = builder.x;
        var y = builder.y;
        builder.x = n - y - 1;
        builder.y =  x;
        gameStateManager.resetPhase();
    }
}