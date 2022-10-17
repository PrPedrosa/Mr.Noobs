//Math.random() * (max - min) + min;

class EnemyMagic {
    constructor(w, h, ctx){
        this.position = this.randPos();
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.identifyPos = this.identifyPosition();
        this.enemyImg = new Image();
        this.enemyImgSrcRight = ["docs/assets/images/Pulse/PulseR/pulse1.png", "docs/assets/images/Pulse/PulseR/pulse2.png", "docs/assets/images/Pulse/PulseR/pulse3.png", "docs/assets/images/Pulse/PulseR/pulse4.png"]
        this.enemyImgSrcLeft = ["docs/assets/images/Pulse/PulseL/pulse1Left.png", "docs/assets/images/Pulse/PulseL/pulse2Left.png", "docs/assets/images/Pulse/PulseL/pulse3Left.png", "docs/assets/images/Pulse/PulseL/pulse4Left.png"]
        this.enemyImgSrcUp = ["docs/assets/images/Pulse/PulseU/pulse1Up.png", "docs/assets/images/Pulse/PulseU/pulse2Up.png", "docs/assets/images/Pulse/PulseU/pulse3Up.png", "docs/assets/images/Pulse/PulseU/pulse4Up.png"]
        this.enemyImgSrcDown = ["docs/assets/images/Pulse/PulseD/pulse1Down.png", "docs/assets/images/Pulse/PulseD/pulse2Down.png", "docs/assets/images/Pulse/PulseD/pulse3Down.png", "docs/assets/images/Pulse/PulseD/pulse4Down.png"] 
        this.frames = 0;
        this.identifyEnemy = "magic";
        this.warningImg = new Image();
        this.warningImgSrc = ["docs/assets/images/arrowRight.png", "docs/assets/images/arrowLeft.png", "docs/assets/images/arrowUp.png", "docs/assets/images/arrowDown.png"] 
        
    }
    //increase speed every 10waves
    //increase number of enemies every 20waves
    
    //put this in game.js???
    drawWarning(){
        if(this.identifyPos === "startsLeft" && this.position[0] < 0) {
            this.warningImg.src = this.warningImgSrc[0];
            ctx.drawImage(this.warningImg, 0, this.position[1], 40, 40);
        }
        if(this.identifyPos === "startsRight" && this.position[0] > 400) {
            this.warningImg.src = this.warningImgSrc[1];
            ctx.drawImage(this.warningImg, 350, this.position[1], 40, 40)
        }
        if(this.identifyPos === "startsTop" && this.position[1] < 0) {
            this.warningImg.src = this.warningImgSrc[3];
            ctx.drawImage(this.warningImg, this.position[0], 0, 40, 40)
        }
        if(this.identifyPos === "startsBottom" && this.position[1] > 400) {
            this.warningImg.src = this.warningImgSrc[2];
            ctx.drawImage(this.warningImg, this.position[0], 350, 40, 40)
        }
    } 

    draw(){
        //get enemy animation
        this.frames += 0.15;
        this.drawWarning();
       
        //draw enemy
        if(this.identifyPos === "startsLeft"){
            this.enemyImg.src = this.enemyImgSrcRight[Math.floor(this.frames % 3)];
            this.position[0] += 1.5
            ctx.drawImage(this.enemyImg, this.position[0], this.position[1], this.w, this.h);
        }
        if(this.identifyPos === "startsRight"){
            this.enemyImg.src = this.enemyImgSrcLeft[Math.floor(this.frames % 3)];
            this.position[0] -= 1.5
            ctx.drawImage(this.enemyImg, this.position[0], this.position[1], this.w, this.h);
        }
        if(this.identifyPos === "startsTop"){
            this.enemyImg.src = this.enemyImgSrcDown[Math.floor(this.frames % 3)];
            this.position[1] += 1.5
            ctx.drawImage(this.enemyImg, this.position[0], this.position[1], this.w, this.h);
        }
        if(this.identifyPos === "startsBottom"){
            this.enemyImg.src = this.enemyImgSrcUp[Math.floor(this.frames % 3)];
            this.position[1] -= 1.5
            ctx.drawImage(this.enemyImg, this.position[0], this.position[1], this.w, this.h);
        }

    }
    
    randPos(){
        let randFirstPos = Math.floor(Math.random()*4);
        let randSecondPos = Math.floor(Math.random()*6);
        let secondPos = [55, 105, 155, 205, 255, 305];
        
        if(randFirstPos === 0) return [-100, secondPos[randSecondPos]];
        else if (randFirstPos === 1) return [490, secondPos[randSecondPos]]; 
        else if (randFirstPos === 2) return [secondPos[randSecondPos], -100]; 
        else if (randFirstPos === 3) return [secondPos[randSecondPos], 490]; 
    }
    
    identifyPosition(){
        if(this.position[0] === -100) return "startsLeft";
        else if(this.position[0] === 490) return "startsRight";
        else if(this.position[1] === -100) return "startsTop";
        else if(this.position[1] === 490) return "startsBottom";
    }

    topPos(){
        return this.position[1];
    }
    bottomPos(){
        return this.position[1] + this.h;
    }
    leftPos(){
        return this.position[0];
    }
    rightPos(){
        return this.position[0] + this.w;
    }
}