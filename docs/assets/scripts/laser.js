class EnemyLaser{
    constructor(w, h, ctx){
        this.position = this.randPos();
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.identifyPos = this.identifyPosition();
        this.identifyEnemy = "laser";
        this.laserImg = new Image();
        this.laserImgSrc = ["docs/assets/images/laserSide.png", "docs/assets/images/laserTop.png"]
        this.warningImg = new Image();
        this.warningImgSrc = ["docs/assets/images/arrowRight.png", "docs/assets/images/arrowLeft.png", "docs/assets/images/arrowUp.png", "docs/assets/images/arrowDown.png"]

    }


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

        this.drawWarning();

        if(this.identifyPos === "startsLeft"){
            this.laserImg.src = this.laserImgSrc[0]
            this.position[0] += 5
            ctx.drawImage(this.laserImg, this.position[0], this.position[1], this.w, this.h);
        }
        if(this.identifyPos === "startsRight"){
            this.laserImg.src = this.laserImgSrc[0]
            this.position[0] -= 5
            ctx.drawImage(this.laserImg, this.position[0], this.position[1], this.w, this.h);
        }
        if(this.identifyPos === "startsTop"){
            this.laserImg.src = this.laserImgSrc[1]
            this.position[1] += 5
            ctx.drawImage(this.laserImg, this.position[0], this.position[1], this.w, this.h);
        }
        if(this.identifyPos === "startsBottom"){
            this.laserImg.src = this.laserImgSrc[1]
            this.position[1] -= 5
            ctx.drawImage(this.laserImg, this.position[0], this.position[1], this.w, this.h);
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