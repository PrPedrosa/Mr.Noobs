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
            if(this.level === 1){
            this.enemies.push(new Enemy(35, 35, this.ctx))
            }
            else this.enemies.push(new Cannonball(35, 35, this.ctx))
        }   
        if (this.waves % 11 === 0) this.numberOfEnemies++;
        console.log(this.enemies)
        }
        
        
    
    sendWaves(){
        if(this.frames % 120 === 0) {
            this.createEnemies();
            this.waves ++
        }
        this.drawWarning(); 

        for(let i = 0; i < this.enemies.length; i++){
            if(this.enemies[i].identifyPos === "startsTop"){
                this.enemies[i].position[1] += 1.5;
                this.enemies[i].draw();
                if(this.enemies[i].position[1] > 400) this.enemies.splice(i, 1);
            }
            if(this.enemies[i].identifyPos === "startsBottom"){
                this.enemies[i].position[1] -= 1.5;
                this.enemies[i].draw();
                if(this.enemies[i].position[1] < 0) this.enemies.splice(i, 1);
            }
            if(this.enemies[i].identifyPos === "startsLeft"){
                this.enemies[i].position[0] += 1.5;
                this.enemies[i].draw();
                if(this.enemies[i].position[0] > 400) this.enemies.splice(i, 1);
            }
            if(this.enemies[i].identifyPos === "startsRight"){
                this.enemies[i].position[0] -= 1.5;
                this.enemies[i].draw();
                if(this.enemies[i].position[0] < 0) this.enemies.splice(i, 1);
            }
            
        }
    }

    lostLevel(){
        this.touched = this.enemies.some(enemy => {
            return this.player.isTouching(enemy);
        });
    }

    goLevel2(){
        if (this.touched) {
            this.level = 2;

        }
    }

    checkGameOver(){
        if (this.touched && this.level === 2) this.gameOver = true;
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