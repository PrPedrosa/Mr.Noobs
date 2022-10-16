//Math.random() * (max - min) + min;

class Enemy {
    constructor(w, h, ctx){
        this.position = this.randPos();
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.identifier = this.identify();
        this.imgSrc = ["docs/assets/images/pulse1.png", "docs/assets/images/pulse2.png", "docs/assets/images/pulse3.png", "docs/assets/images/pulse4.png"]
        this.frames = 0;
        this.img = new Image();
        this.warningImg = new Image();
        this.warningImgSrc = ["docs/assets/images/arrowRight.png", "docs/assets/images/arrowLeft.png", "docs/assets/images/arrowUp.png", "docs/assets/images/arrowDown.png"]
        /* this.img.addEventListener("load", () =>{
            this.draw()
        }) */
    }
    //increase speed every 10waves
    //increase number of enemies every 20waves
    //3 different enemies (bonus)
    
    draw(){
        //get enemy animation
        this.img.src = this.imgSrc[Math.floor(this.frames % 3)];
        this.frames += 0.15
        //get warning sign
        if(this.identifier === "startsLeft" && this.position[0] < 0) {
            this.warningImg.src = this.warningImgSrc[0];
            ctx.drawImage(this.warningImg, 0, this.position[1], 40, 40);
        }
        if(this.identifier === "startsRight" && this.position[0] > 400) {
            this.warningImg.src = this.warningImgSrc[1];
            ctx.drawImage(this.warningImg, 350, this.position[1], 40, 40)
        }
        if(this.identifier === "startsTop" && this.position[1] < 0) {
            this.warningImg.src = this.warningImgSrc[3];
            ctx.drawImage(this.warningImg, this.position[0], 0, 40, 40)
        }
        if(this.identifier === "startsBottom" && this.position[1] > 400) {
            this.warningImg.src = this.warningImgSrc[2];
            ctx.drawImage(this.warningImg, this.position[0], 350, 40, 40)
        }
        //draw enemy
        ctx.drawImage(this.img, this.position[0], this.position[1], this.w, this.h);

    }
    
    randPos(){
        let randFirstPos = Math.floor(Math.random()*4);
        let randSecondPos = Math.floor(Math.random()*6);
        let secondPos = [55, 105, 155, 205, 255, 305];
        
        if(randFirstPos === 0) return [-90, secondPos[randSecondPos]];
        else if (randFirstPos === 1) return [490, secondPos[randSecondPos]]; 
        else if (randFirstPos === 2) return [secondPos[randSecondPos], -90]; 
        else if (randFirstPos === 3) return [secondPos[randSecondPos], 490]; 
    }
    
    identify(){
        if(this.position[0] === -90) return "startsLeft";
        else if(this.position[0] === 490) return "startsRight";
        else if(this.position[1] === -90) return "startsTop";
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