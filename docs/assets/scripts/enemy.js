//Math.random() * (max - min) + min;

class Enemy {
    constructor(w, h, ctx){
        this.x = this.randPosX();
        this.y = this.randPosY();
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.identifier = this.identify();

        this.img = new Image();
        this.img.addEventListener("load", () =>{
            this.draw()
        })
        this.img.src = "docs/assets/images/Boss_vermelho.png";
    }
    //increase speed every 10waves
    //increase number of enemies every 20waves
    //3 different enemies (bonus)

    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

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

    identify(){
        if(this.y === -40) return 1;
        else return 2
    }





}