class EnemyLaser{
    constructor(ctx){
        this.position = this.randomPosition();
        this.w = 35;
        this.h = 35;
        this.ctx = ctx;
        this.identifyPos = this.identifyPosition();
        this.identifyEnemy = "laser";
        this.laserImg = new Image();
        this.laserImgSrc = ["docs/assets/images/laserRed.png", "docs/assets/images/laserRedUp.png"]
        this.warningImg = new Image();
        this.warningImgSrc = ["docs/assets/images/warningArrowRight.png", "docs/assets/images/warningArrowLeft.png", "docs/assets/images/warningArrowUp.png", "docs/assets/images/warningArrowDown.png"]

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

        if(this.identifyPos === "startsLeft"){
            this.laserImg.src = this.laserImgSrc[0]
            this.position[0] += 15
            ctx.drawImage(this.laserImg, this.position[0], this.position[1], 400, 35);
        }
        if(this.identifyPos === "startsRight"){
            this.laserImg.src = this.laserImgSrc[0]
            this.position[0] -= 15
            ctx.drawImage(this.laserImg, this.position[0], this.position[1], 400, 35);
        }
        if(this.identifyPos === "startsTop"){
            this.laserImg.src = this.laserImgSrc[1]
            this.position[1] += 15
            ctx.drawImage(this.laserImg, this.position[0], this.position[1], 35, 400);
        }
        if(this.identifyPos === "startsBottom"){
            this.laserImg.src = this.laserImgSrc[1]
            this.position[1] -= 15
            ctx.drawImage(this.laserImg, this.position[0], this.position[1], 35, 400);
        }
    }

    randomPosition(){
        let randFirstPos = Math.floor(Math.random()*4);
        let randSecondPos = Math.floor(Math.random()*6);
        let secondPos = [55, 105, 155, 205, 255, 305];
        
        if(randFirstPos === 0) return [-800, secondPos[randSecondPos]];
        else if (randFirstPos === 1) return [790, secondPos[randSecondPos]]; 
        else if (randFirstPos === 2) return [secondPos[randSecondPos], -800]; 
        else if (randFirstPos === 3) return [secondPos[randSecondPos], 790]; 
    }
    
    identifyPosition(){
        if(this.position[0] === -800) return "startsLeft";
        else if(this.position[0] === 790) return "startsRight";
        else if(this.position[1] === -800) return "startsTop";
        else if(this.position[1] === 790) return "startsBottom";
    }

    topPos(){
        return this.position[1];
    }
    bottomPos(){
        if(this.identifyPos === "startsTop" || this.identifyPos === "startsBottom") return this.position[1] + 400
        else return this.position[1] + this.h; 
    }
    leftPos(){      
        return this.position[0];
    }
    rightPos(){
        if(this.identifyPos === "startsLeft" || this.identifyPos === "startsRight") return this.position[0] + 400
        else return this.position[0] + this.w;   
    }


}