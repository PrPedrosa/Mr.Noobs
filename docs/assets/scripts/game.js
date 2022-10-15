class Game {
    constructor(player, enemy){
        this.animationFrameId;
        this.player = player;
        this.enemy = enemy;
        this.frames = 0;


    }

    

    update = () => {
        drawBoard();  
        console.log("updating");
        this.player.drawPlayer();
        this.enemy.drawEnemy();
        this.animationFrameId = requestAnimationFrame(this.update);     
        this.endGame();
    } 

    startGame = () => {
        drawBoard();
        this.player.drawPlayer();
        this.enemy.drawEnemy();
        this.update();
    }
    
    endGame = () => {
        if(this.player.y > 500) cancelAnimationFrame(this.animationFrameId)    
    }
}