//Math.random() * (max - min) + min;

class Enemy {
    constructor(w, h, ctx){
        this.position = this.randPos();
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.identifier = this.identify();

        this.img = new Image();
        this.img.addEventListener("load", () =>{
            this.draw()
        })
        this.img.src = "docs/assets/images/pulse1.png";
    }
    //increase speed every 10waves
    //increase number of enemies every 20waves
    //3 different enemies (bonus)

    draw(){
        ctx.drawImage(this.img, this.position[0], this.position[1], this.w, this.h);

    }

    randPosX(){
        let posX = [50, 100, 150, 200, 250, 300];
        return posX[Math.floor(Math.random()*6)]
    }

    randPosY(){
        let posY = [-40, 400]
        let randomPosition = posY[Math.floor(Math.random()*2)]
        return randomPosition;
    }

    
    randPos(){
        let randFirstPos = Math.floor(Math.random()*4);
        let randSecondPos = Math.floor(Math.random()*6);
        let secondPos = [55, 105, 155, 205, 255, 305];
        
        if(randFirstPos === 0) return [-45, secondPos[randSecondPos]];
        else if (randFirstPos === 1) return [405, secondPos[randSecondPos]]; 
        else if (randFirstPos === 2) return [secondPos[randSecondPos], -45]; 
        else if (randFirstPos === 3) return [secondPos[randSecondPos], 405]; 
    }
    
    identify(){
        if(this.position[1] === -45) return "startsTop";
        else if(this.position[1] === 405) return "startsBottom";
        else if(this.position[0] === -45) return "startsLeft";
        else if(this.position[0] === 405) return "startsRight";
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