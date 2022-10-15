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
        }
        
    
    sendWaves(){
        if(this.frames % 120 === 0) {
            this.createEnemies();
            this.waves ++
        }

        for(let i = 0; i < this.enemiesTop.length; i++){
            if(this.enemiesTop[i].identifier === "startsTop"){
                this.enemiesTop[i].position[1] ++;
                this.enemiesTop[i].draw();
                if(this.enemiesTop[i].position[1] > 400) this.enemiesTop.splice(i, 1);
            }
            if(this.enemiesTop[i].identifier === "startsBottom"){
                this.enemiesTop[i].position[1] --;
                this.enemiesTop[i].draw();
                if(this.enemiesTop[i].position[1] < 0) this.enemiesTop.splice(i, 1);
            }
            if(this.enemiesTop[i].identifier === "startsLeft"){
                this.enemiesTop[i].position[0] ++;
                this.enemiesTop[i].draw();
                if(this.enemiesTop[i].position[0] > 400) this.enemiesTop.splice(i, 1);
            }
            if(this.enemiesTop[i].identifier === "startsRight"){
                this.enemiesTop[i].position[0] --;
                this.enemiesTop[i].draw();
                if(this.enemiesTop[i].position[0] < 0) this.enemiesTop.splice(i, 1);
            }
            
        }
    }


    update = () => {
        this.frames++;
        drawBoard();  
        console.log(this.enemiesTop);
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