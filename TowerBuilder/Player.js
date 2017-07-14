class Player{
    constructor(x1, y1, x2, y2, sprite){
        this.builder1 = new Builder(x1, y1, sprite.idle);
        this.builder2 = new Builder(x2, y2, sprite.idle);
        this.sprite = sprite.idle;
        this.waveSprite = sprite.wave;
        this.walkSprite = sprite.walk;
    }
    
    isTrapped(){
        if(this.builder1.findAvailableMoves().length == 0 &&
           this.builder2.findAvailableMoves().length == 0){
           return true;
           }
        else return false;
    }
    
    
}