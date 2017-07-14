function handleKey(event){
    switch (event.key){
        case "a":
            board.rotateClockwise();
            break;
        default:
            break;
    }
}