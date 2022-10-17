class Cannonball{
    constructor(w, h, ctx){
        this.position = this.randPos();
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.identifyPos = this.identifyPosition();
        this.identifyEnemy = "cannon";

        this.cannonImg = new Image();

    }

    draw(){
        this.cannonImg.src = "docs/assets/images/cannonball.png";
        ctx.drawImage(this.cannonImg, this.position[0], this.position[1], this.w, this.h);
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