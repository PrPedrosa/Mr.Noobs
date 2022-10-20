class Game {
    constructor(player){
        this.animationFrameId;
        this.player = player;
        this.gameOver = false;
        this.frames = 0;
        this.enemies = [];
        this.wavesMagic = 0;
        this.wavesCannon = 0;
        this.wavesLaser = 0;
        this.numberOfEnemies = 1;
        this.score = document.getElementById("score");
        this.gameOverImg = document.getElementById("game-over-img");
        this.level = 1;
        this.warningImg = new Image();
        this.warningImgSrc = ["docs/assets/images/arrowRight.png", "docs/assets/images/arrowLeft.png", "docs/assets/images/arrowUp.png", "docs/assets/images/arrowDown.png"];
        this.touched = false;
        this.timer = 0;
        this.deadImg = new Image();
        this.deadImg.src = "docs/assets/images/stickmanDead.png";
        this.lostImg = new Image();
        this.lostImg.src = "docs/assets/images/lostStickman.png";
        this.endTimer = 0;
        this.levelImg = document.getElementById("level-image");
        this.magicScore = document.getElementById("magic-score");
        this.cannonScore = document.getElementById("cannon-score");
        this.laserScore = document.getElementById("laser-score");
        this.multiplyScore = document.getElementById("display-final-score");
        this.scoreImg = document.getElementById("score-img");
        this.scoreTable = document.getElementById("final-score-div");
        this.firstHiScore = document.getElementById("hi-score-1");
        this.secondHiScore = document.getElementById("hi-score-2");
        this.thirdHiScore = document.getElementById("hi-score-3");
        this.goBackArrow = document.getElementById("go-back-arrow");
        this.canvasStyle = document.getElementById("canvas");
        /* this.powerImg = new Image();
        this.powerTimer = 0;
        this.powerCounter = 0;
        this.powerElement = document.getElementById("aura-spell"); */

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
                this.enemies.push(new EnemyLaser(this.ctx))
            }
        } 

        if (this.level === 1 && this.wavesMagic % 10 === 0 && this.numberOfEnemies < 10) this.numberOfEnemies++;
        if (this.level === 2 && this.wavesCannon % 7 === 0 && this.numberOfEnemies < 10) this.numberOfEnemies++;
        if (this.level === 3 && this.wavesLaser % 5 === 0 && this.numberOfEnemies < 6) this.numberOfEnemies++;
    }
        
        
    
    sendWaves(){
        if(this.frames % 140 === 0 && this.timer === 0) {//level 1
            this.createEnemies();
            this.wavesMagic ++;
        }

        if(this.frames % 100 === 0 && this.timer > 500 && this.timer < 505) {//level 2
            this.createEnemies();
            this.wavesCannon ++;
        }

        if(this.frames % 100 === 0 && this.timer > 1000) {
            this.createEnemies();
            if(this.endTimer === 0) this.wavesLaser ++;
        }
         

        for(let i = 0; i < this.enemies.length; i++){
            if(this.enemies[i].identifyPos === "startsTop"){
                if(this.enemies[i].position[1] > 400) this.enemies.splice(i, 1);
                else this.enemies[i].draw();
            }

            else if(this.enemies[i].identifyPos === "startsBottom"){
                if(this.enemies[i].position[1] < -400) this.enemies.splice(i, 1);
                else this.enemies[i].draw();
            }

            else if(this.enemies[i].identifyPos === "startsLeft"){
                if(this.enemies[i].position[0] > 400) this.enemies.splice(i, 1);
                else this.enemies[i].draw();
            }

            else if(this.enemies[i].identifyPos === "startsRight"){
                if(this.enemies[i].position[0] < -400) this.enemies.splice(i, 1);
                else this.enemies[i].draw();
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
            this.level = 2;
            this.numberOfEnemies = 1;
        }

        if (this.level === 2 && this.timer < 502) this.timer ++;  
    }

    goLevel3(){
        if (this.touched && this.timer > 500){
            this.level = 3;
            this.numberOfEnemies = 1;
        }

        if (this.level === 3 && this.timer < 1001) this.timer ++;
    }

    drawPlayer(){
        if (this.timer > 0 && this.timer < 400) ctx.drawImage(this.deadImg, this.player.x, this.player.y, this.player.w, this.player.h);
        else if (this.timer > 502 && this.timer < 900) ctx.drawImage(this.deadImg, this.player.x, this.player.y, this.player.w, this.player.h);
        else if (this.timer > 1001) ctx.drawImage(this.lostImg, this.player.x, this.player.y, this.player.w, this.player.h);
        else this.player.draw();
    }

    checkGameOver(){
        if (this.touched && this.level === 3 && this.timer > 900) this.timer = 1100;
        if (this.timer === 1100) this.endTimer ++;
        if (this.endTimer > 100) {
            this.gameOver = true;
            this.goBackArrow.style.width = "200px";
            this.goBackArrow.style.height = "200px";
        }
    }

    updateScore(){
        if(this.timer < 150){
            this.levelImg.src = "docs/assets/images/magicText.png";
            this.score.innerHTML = this.wavesMagic;
            this.score.style.color = "blue"; 
        }

        else if(this.timer > 150 && this.timer < 700){
            this.levelImg.src = "docs/assets/images/cannonText.png";
            this.score.innerHTML = this.wavesCannon;
            this.score.style.color = "black";
        }

        else if(this.timer > 700 && this.timer < 1050){
            this.levelImg.src = "docs/assets/images/laserText.png";
            this.score.innerHTML = this.wavesLaser;
            this.score.style.color = "red";
        }

        else if(this.timer === 1100){
            this.levelImg.style.display = "none";
            this.score.style.display = "none";
            this.magicScore.innerHTML = this.wavesMagic;
            this.cannonScore.innerHTML = this.wavesCannon;
            this.laserScore.innerHTML = this.wavesLaser;
            this.multiplyScore.innerHTML = this.wavesMagic * this.wavesCannon * this.wavesLaser
            this.scoreImg.style.display = "block";
            this.scoreTable.style.display = "flex";

            if(this.endTimer === 50){
                if(+(this.firstHiScore.lastElementChild.lastElementChild.innerHTML) < this.wavesMagic * this.wavesCannon * this.wavesLaser){
                    this.thirdHiScore.innerHTML = this.secondHiScore.innerHTML;
                    this.secondHiScore.innerHTML = this.firstHiScore.innerHTML;
                    this.firstHiScore.innerHTML = `<div class="list-item-div"><span class="magic-hiscore">${this.wavesMagic}</span><span class="x-hiscore">x</span><span class="cannon-hiscore">${this.wavesCannon}</span><span class="x-hiscore">x</span><span class="laser-hiscore">${this.wavesLaser}</span><span class="x-hiscore">=</span><span class="final-score-hiscore">${this.wavesMagic * this.wavesCannon * this.wavesLaser}</span></div>`;
                }
                
                else if(+(this.secondHiScore.lastElementChild.lastElementChild.innerHTML) < this.wavesMagic * this.wavesCannon * this.wavesLaser){
                    this.thirdHiScore.innerHTML = this.secondHiScore.innerHTML;
                    this.secondHiScore.innerHTML = `<div class="list-item-div"><span class="magic-hiscore">${this.wavesMagic}</span><span class="x-hiscore">x</span><span class="cannon-hiscore">${this.wavesCannon}</span><span class="x-hiscore">x</span><span class="laser-hiscore">${this.wavesLaser}</span><span class="x-hiscore">=</span><span class="final-score-hiscore">${this.wavesMagic * this.wavesCannon * this.wavesLaser}</span></div>`;
                }
                
                else if(+(this.thirdHiScore.lastElementChild.lastElementChild.innerHTML) < this.wavesMagic * this.wavesCannon * this.wavesLaser){
                    this.thirdHiScore.innerHTML = `<div class="list-item-div"><span class="magic-hiscore">${this.wavesMagic}</span><span class="x-hiscore">x</span><span class="cannon-hiscore">${this.wavesCannon}</span><span class="x-hiscore">x</span><span class="laser-hiscore">${this.wavesLaser}</span><span class="x-hiscore">=</span><span class="final-score-hiscore">${this.wavesMagic * this.wavesCannon * this.wavesLaser}</span></div>`;
                }  
                window.localStorage.setItem("hiscore-1", this.firstHiScore.innerHTML);
                window.localStorage.setItem("hiscore-2", this.secondHiScore.innerHTML);
                window.localStorage.setItem("hiscore-3", this.thirdHiScore.innerHTML);
            }  
        }
    }

    /* drawPower(){
        if((this.wavesMagic === 50 && this.powerCounter < 1) || (this.wavesCannon === 50 && this.powerCounter < 1) || (this.wavesLaser === 50 && this.powerCounter < 1)) {
            this.powerCounter ++;
        }
        if(this.powerTimer <= 0) this.powerTimer = 0; 
        if(this.powerTimer > 0){
            this.powerTimer --;
            this.powerImg.src = "docs/assets/images/auraBlast.png"
            ctx.drawImage(this.powerImg, 0, 0, 400, 400);
        }

        this.powerElement.innerHTML = `Aura Powers: ${this.powerCounter}`
    } */




    /* saveHiScores(){
        window.localStorage.setItem("hiscore-1", this.firstHiScore.innerHTML);
        window.localStorage.setItem("hiscore-2", this.secondHiScore.innerHTML);
        window.localStorage.setItem("hiscore-3", this.thirdHiScore.innerHTML);
    }  */

    styleCanvas(){
        if(this.timer > 700) this.canvasStyle.style.boxShadow = "0 0 100px 0 red"
        else if(this.timer > 150) this.canvasStyle.style.boxShadow = "0 0 100px 20px black"
    }


    update = () => {
        this.frames++;
        drawBoard();  
        this.styleCanvas();
        this.drawPlayer();
        this.sendWaves();
        //this.drawPower();
        this.updateScore();
        this.lostLevel();
        this.goLevel2();
        this.goLevel3();
        this.checkGameOver();
        //this.saveHiScores();   
        this.animationFrameId = requestAnimationFrame(this.update);
        if(this.gameOver) {
            this.gameOverImg.style.display = "block";
            cancelAnimationFrame(this.animationFrameId);
        }
    } 

    startGame = () => {
        this.canvasStyle.style.boxShadow = "0 0 100px 0 blue"
        this.levelImg.style.display = "block";
        this.score.style.display = "block";
        drawBoard();
        this.player.draw();
        this.gameOver = false;
        this.gameOverImg.style.display = "none";
        this.scoreImg.style.display = "none";
        this.scoreTable.style.display = "none";
        this.goBackArrow.style.width = "65px";
        this.goBackArrow.style.height = "65px";
        this.update();
    }
    
}