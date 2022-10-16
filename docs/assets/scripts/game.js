class Game {
    constructor(player){
        this.animationFrameId;
        this.player = player;
        this.gameOver = false;
        this.frames = 0;
        this.enemies = [];
        this.waves = 1;


    }

    createEnemies(){
       
        for(let i = 0; i < 3; i++){
            this.enemies.push(new Enemy(40, 40, this.ctx))
            }   
        }
        
    
    sendWaves(){
        if(this.frames % 120 === 0) {
            this.createEnemies();
            this.waves ++
        }

        for(let i = 0; i < this.enemies.length; i++){
            if(this.enemies[i].identifier === "startsTop"){
                this.enemies[i].position[1] ++;
                this.enemies[i].draw();
                if(this.enemies[i].position[1] > 400) this.enemies.splice(i, 1);
            }
            if(this.enemies[i].identifier === "startsBottom"){
                this.enemies[i].position[1] --;
                this.enemies[i].draw();
                if(this.enemies[i].position[1] < 0) this.enemies.splice(i, 1);
            }
            if(this.enemies[i].identifier === "startsLeft"){
                this.enemies[i].position[0] ++;
                this.enemies[i].draw();
                if(this.enemies[i].position[0] > 400) this.enemies.splice(i, 1);
            }
            if(this.enemies[i].identifier === "startsRight"){
                this.enemies[i].position[0] --;
                this.enemies[i].draw();
                if(this.enemies[i].position[0] < 0) this.enemies.splice(i, 1);
            }
            
        }
    }

    lost(){
        let touched = this.enemies.some(enemy => {
            return this.player.isTouching(enemy);
        });
        if(touched) this.gameOver = true;
        console.log(this.gameOver);
    }





    update = () => {
        this.frames++;
        drawBoard();  
        this.player.draw();
        this.sendWaves();
        this.lost();
        if(!this.gameOver) requestAnimationFrame(this.update);     
    } 

    startGame = () => {
        drawBoard();
        this.player.draw();
        this.update();
    }
    
    stop = () => {
        console.log("here");
        cancelAnimationFrame(this.animationFrameId)    
    }
}