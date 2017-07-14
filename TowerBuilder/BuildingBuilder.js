class BuildingBuilder{
    constructor(player){
        this.activeBuilder = player.builder1.active? player.builder1 : player.builder2 
        this.player = player;
    }
    
    onMouseMove(){
        c.style.cursor = "default";
        var availableBuildSpots = this.activeBuilder.findAvailableBuilds();
        
        for (var i = 0; i < availableBuildSpots.length; i++){
            this.highlightBuildableTile(availableBuildSpots[i].x, availableBuildSpots[i].y);
        }
    }
    
    highlightBuildableTile(x, y){
        var buildableCell = board.board[x][y];
        
        if (cellClicked(x,y)) {
            buildableCell[0] = "./images/groundHighlighted.png";
            c.style.cursor = "pointer";
        }
        else{
            buildableCell[0] = 0;
        }
    }
        
    onClick(){
        var availableBuildSpots = this.activeBuilder.findAvailableBuilds();
        
        for (var i = 0; i < availableBuildSpots.length; i++){
            var x = availableBuildSpots[i].x;
            var y = availableBuildSpots[i].y;
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
        board.buildAtLocation(x,y);
        this.activeBuilder.setInactive();
        board.removeHighlights();
        gameStateManager.advancePhase();
    }
}