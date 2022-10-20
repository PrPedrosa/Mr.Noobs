class EnemyCannonball{
    constructor(w, h, ctx){
        this.position = this.randPos();
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.identifyPos = this.identifyPosition();
        this.identifyEnemy = "cannon";
        this.cannonImg = new Image();
        this.warningImg = new Image();
        this.warningImgSrc = ["docs/assets/images/warningArrowRight.png", "docs/assets/images/warningArrowLeft.png", "docs/assets/images/warningArrowUp.png", "docs/assets/images/warningArrowDown.png"];
    }


    drawWarning(){
        if(this.identifyPos === "startsLeft" && this.position[0] < 0) {
            this.warningImg.src = this.warningImgSrc[0];
            ctx.drawImage(this.warningImg, 0, this.position[1], 40, 40);
        }
        if(this.identifyPos === "startsRight" && this.position[0] > 400) {
            this.warningImg.src = this.warningImgSrc[1];
            ctx.drawImage(this.warningImg, 360, this.position[1], 40, 40)
        }
        if(this.identifyPos === "startsTop" && this.position[1] < 0) {
            this.warningImg.src = this.warningImgSrc[3];
            ctx.drawImage(this.warningImg, this.position[0], 0, 40, 40)
        }
        if(this.identifyPos === "startsBottom" && this.position[1] > 400) {
            this.warningImg.src = this.warningImgSrc[2];
            ctx.drawImage(this.warningImg, this.position[0], 360, 40, 40)
        }
    }

    draw(){

        this.drawWarning();
        this.cannonImg.src = "docs/assets/images/cannonball.png";

        if(this.identifyPos === "startsLeft"){
            this.position[0] += 5
            ctx.drawImage(this.cannonImg, this.position[0], this.position[1], this.w, this.h);
        }
        if(this.identifyPos === "startsRight"){
            this.position[0] -= 5
            ctx.drawImage(this.cannonImg, this.position[0], this.position[1], this.w, this.h);
        }
        if(this.identifyPos === "startsTop"){
            this.position[1] += 5
            ctx.drawImage(this.cannonImg, this.position[0], this.position[1], this.w, this.h);
        }
        if(this.identifyPos === "startsBottom"){
            this.position[1] -= 5
            ctx.drawImage(this.cannonImg, this.position[0], this.position[1], this.w, this.h);
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