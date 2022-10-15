class Game {
    constructor(player){
        this.animationFrameId;
        this.player = player;
        
        this.frames = 0;
        this.enemiesTop = [];
        this.waves = 1;


    }

    createEnemies(){
       
        for(let i = 0; i < 3; i++){
            this.enemiesTop.push(new Enemy(40, 40, this.ctx))
            }   
   
        /* for(let i = 0; i < this.enemiesTop.length; i++){
            this.enemiesTop[i].y ++;
            this.enemiesTop[i].draw();
        } */   
        }
        
    
    sendWaves(){
        if(this.frames % 120 === 0) {
            this.createEnemies();
            this.waves ++
        }

        for(let i = 0; i < this.enemiesTop.length; i++){
            if(this.enemiesTop[i].identifier === 1){
                this.enemiesTop[i].y ++;
                this.enemiesTop[i].draw();
            }
            if(this.enemiesTop[i].identifier ===2){
                this.enemiesTop[i].y --;
                this.enemiesTop[i].draw();
            }
            
        }
    }


    update = () => {
        this.frames++;
        drawBoard();  
        console.log(this.waves);
        this.player.draw();
        this.sendWaves();
        this.animationFrameId = requestAnimationFrame(this.update);     
        this.endGame();
    } 

    startGame = () => {
        drawBoard();
        this.player.draw();
        this.update();
    }
    
    endGame = () => {
        if(this.player.y > 500) cancelAnimationFrame(this.animationFrameId)    
    }
}