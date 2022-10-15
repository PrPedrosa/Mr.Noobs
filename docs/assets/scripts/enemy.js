class Enemy {
    constructor(x, y, w, h, ctx){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = ctx;

        this.img = new Image();
        this.img.addEventListener("load", () =>{
            this.drawEnemy()
        })
        this.img.src = "docs/assets/images/Boss_vermelho.png";
    }
    //increase speed every 10waves
    //increase number of enemies every 20waves
    //3 different enemies (bonus)

    drawEnemy(){

        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

    }
}