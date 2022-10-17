class Game {
    constructor(player){
        this.animationFrameId;
        this.player = player;
        this.gameOver = false;
        this.frames = 0;
        this.enemies = [];
        this.waves = 1;
        this.numberOfEnemies = 1
        this.score = document.getElementById("score");
        


    }

    createEnemies(){
       
        for(let m = 0; m < this.numberOfEnemies; m++){
            this.enemies.push(new Enemy(35, 35, this.ctx))
        }   
        if (this.waves % 10 === 0) this.numberOfEnemies++;
        }
        
        
    
    sendWaves(){
        if(this.frames % 120 === 0) {
            this.createEnemies();
            this.waves ++
        }

        for(let i = 0; i < this.enemies.length; i++){
            if(this.enemies[i].identifier === "startsTop"){
                this.enemies[i].position[1] += 1.5;
                this.enemies[i].draw();
                if(this.enemies[i].position[1] > 400) this.enemies.splice(i, 1);
            }
            if(this.enemies[i].identifier === "startsBottom"){
                this.enemies[i].position[1] -= 1.5;
                this.enemies[i].draw();
                if(this.enemies[i].position[1] < 0) this.enemies.splice(i, 1);
            }
            if(this.enemies[i].identifier === "startsLeft"){
                this.enemies[i].position[0] += 1.5;
                this.enemies[i].draw();
                if(this.enemies[i].position[0] > 400) this.enemies.splice(i, 1);
            }
            if(this.enemies[i].identifier === "startsRight"){
                this.enemies[i].position[0] -= 1.5;
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
        //console.log(this.gameOver);
    }





    update = () => {
        this.frames++;
        drawBoard();  
        this.player.draw();
        this.sendWaves();
        console.log(this.waves);
        this.score.innerHTML = `Wave: ${this.waves}`
        this.lost();    
        this.animationFrameId = requestAnimationFrame(this.update)
        if(this.gameOver) cancelAnimationFrame(this.animationFrameId);
    } 

    startGame = () => {
        drawBoard();
        this.player.draw();
        this.gameOver = false;
        this.update();
    }
    
}