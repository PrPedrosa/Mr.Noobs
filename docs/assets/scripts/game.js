class Game {
    constructor(player){
        this.animationFrameId;
        this.player = player;
        this.gameOver = false;
        this.frames = 0;
        this.enemies = [];
        this.waves = 0;
        this.numberOfEnemies = 1
        this.score = document.getElementById("score");
        this.level = 1;
        this.warningImg = new Image();
        this.warningImgSrc = ["docs/assets/images/arrowRight.png", "docs/assets/images/arrowLeft.png", "docs/assets/images/arrowUp.png", "docs/assets/images/arrowDown.png"]
        this.touched = false;
        this.timer = 0;


    }

    drawWarning(){

        for(let i = 0; i < this.enemies.length; i++){
        if(this.enemies[i].identifyPos === "startsLeft" && this.enemies[i].position[0] < 0) {
            this.warningImg.src = this.warningImgSrc[0];
            ctx.drawImage(this.warningImg, 0, this.enemies[i].position[1], 40, 40);
        }
        if(this.enemies[i].identifyPos === "startsRight" && this.enemies[i].position[0] > 400) {
            this.warningImg.src = this.warningImgSrc[1];
            ctx.drawImage(this.warningImg, 350, this.enemies[i].position[1], 40, 40)
        }
        if(this.enemies[i].identifyPos === "startsTop" && this.enemies[i].position[1] < 0) {
            this.warningImg.src = this.warningImgSrc[3];
            ctx.drawImage(this.warningImg, this.enemies[i].position[0], 0, 40, 40)
        }
        if(this.enemies[i].identifyPos === "startsBottom" && this.enemies[i].position[1] > 400) {
            this.warningImg.src = this.warningImgSrc[2];
            ctx.drawImage(this.warningImg, this.enemies[i].position[0], 350, 40, 40)
        }
     }
    }

    createEnemies(){
       
        for(let m = 0; m < this.numberOfEnemies; m++){
            if(this.level === 1) {
                this.enemies.push(new Enemy(35, 35, this.ctx))
                
            }
            
            else if(this.level === 2 && this.timer > 500) {
                this.enemies.push(new Cannonball(35, 35, this.ctx))
        
            }
        } 
        if (this.waves % 10 === 0) this.numberOfEnemies++;
        console.log(this.numberOfEnemies)
        }
        
        
    
    sendWaves(){
         if(this.frames % 120 === 0 && (this.timer === 0 || this.timer > 500)) {
            this.createEnemies();
            this.waves ++;
        }
        this.drawWarning(); 

        for(let i = 0; i < this.enemies.length; i++){
            if(this.enemies[i].identifyPos === "startsTop"){
                if(this.enemies[i].position[1] > 400) this.enemies.splice(i, 1);
                else {this.enemies[i].position[1] += 1.5;
                this.enemies[i].draw();}
            }
            else if(this.enemies[i].identifyPos === "startsBottom"){
                if(this.enemies[i].position[1] < 0) this.enemies.splice(i, 1);
                else {this.enemies[i].position[1] -= 1.5;
                this.enemies[i].draw();}
            }
            else if(this.enemies[i].identifyPos === "startsLeft"){
                if(this.enemies[i].position[0] > 400) this.enemies.splice(i, 1);
                else {this.enemies[i].position[0] += 1.5;
                this.enemies[i].draw();}
            }
            else if(this.enemies[i].identifyPos === "startsRight"){
                if(this.enemies[i].position[0] < 0) this.enemies.splice(i, 1);
                else {this.enemies[i].position[0] -= 1.5;
                this.enemies[i].draw();}
            }
            
        }
    }

    lostLevel(){
        this.touched = this.enemies.some(enemy => {
            return this.player.isTouching(enemy);
        })
        
    }

    goLevel2(){
        if (this.touched) {
            //change img, disable controls
            this.level = 2;
            this.waves = 0;
            this.numberOfEnemies = 1;
        }
        if (this.level === 2 && this.timer < 501) this.timer ++
    }

    checkGameOver(){
        if (this.touched && this.level === 3) this.gameOver = true;
    }





    update = () => {
        this.frames++;
        drawBoard();  
        this.player.draw();
        this.sendWaves();
        this.score.innerHTML = `Wave: ${this.waves}`
        this.lostLevel();
        this.goLevel2();
        this.checkGameOver();    
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