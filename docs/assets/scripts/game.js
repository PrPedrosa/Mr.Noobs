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
        this.deadImg = new Image();
        this.deadImg.src = "docs/assets/images/stickmanDead.png"


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
                this.enemies.push(new EnemyMagic(35, 35, this.ctx))
                
            }
            
            else if(this.level === 2 && this.timer > 500) {
                this.enemies.push(new EnemyCannonball(35, 35, this.ctx))
        
            }

            else if(this.level === 3 && this.timer > 1000){
                this.enemies.push(new EnemyLaser(35, 35, this.ctx))
            }
        } 
        if (this.level === 1 && this.waves % 10 === 0) this.numberOfEnemies++;
        if (this.level === 2 && this.waves % 7 === 0) this.numberOfEnemies++;
        if (this.level === 3 && this.waves % 5 === 0) this.numberOfEnemies++;
    }
        
        
    
    sendWaves(){
         if(this.frames % 120 === 0 && this.timer === 0) {//level 1
            this.createEnemies();
            this.waves ++;
        }

        if(this.frames % 100 === 0 && this.timer > 500 && this.timer < 505) {//level 2
            this.createEnemies();
            this.waves ++;
        }

        if(this.frames % 80 === 0 && this.timer > 1000) {
            this.createEnemies();
            this.waves ++;
        }
        //this.drawWarning(); 

        for(let i = 0; i < this.enemies.length; i++){
            if(this.enemies[i].identifyPos === "startsTop"){
                if(this.enemies[i].position[1] > 400) this.enemies.splice(i, 1);
                else {//this.enemies[i].position[1] += 1.5;
                this.enemies[i].draw();}
            }
            else if(this.enemies[i].identifyPos === "startsBottom"){
                if(this.enemies[i].position[1] < 0) this.enemies.splice(i, 1);
                else {//this.enemies[i].position[1] -= 1.5;
                this.enemies[i].draw();}
            }
            else if(this.enemies[i].identifyPos === "startsLeft"){
                if(this.enemies[i].position[0] > 400) this.enemies.splice(i, 1);
                else {//this.enemies[i].position[0] += 1.5;
                this.enemies[i].draw();}
            }
            else if(this.enemies[i].identifyPos === "startsRight"){
                if(this.enemies[i].position[0] < 0) this.enemies.splice(i, 1);
                else {//this.enemies[i].position[0] -= 1.5;
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
        if (this.timer > 0 && this.timer < 350) ctx.drawImage(this.deadImg, this.player.x, this.player.y, this.player.w, this.player.h);
        if (this.level === 2 && this.timer < 502) this.timer ++;
        console.log(this.timer)
    }

    goLevel3(){
        if (this.touched && this.timer > 500){
            this.level = 3;
            this.waves = 0;
            this.numberOfEnemies = 1;
        }
        if (this.timer > 502 && this.timer < 1000) ctx.drawImage(this.deadImg, this.player.x, this.player.y, this.player.w, this.player.h);
        if (this.level === 3 && this.timer < 1001) this.timer ++;
    }

    checkGameOver(){
        if (this.touched && this.level === 3 && this.timer > 900) this.gameOver = true;
        //create a new timer and if(that timer is bigger than x, game over is true )
    }





    update = () => {
        this.frames++;
        drawBoard();  
        if(!(this.timer > 0 && this.timer < 200)) this.player.draw();
        this.sendWaves();
        this.score.innerHTML = `Wave: ${this.waves}`
        this.lostLevel();
        this.goLevel2();
        this.goLevel3();
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