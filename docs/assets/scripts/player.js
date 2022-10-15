class Player {
    //cant move in grey area
    //one life shield? (bonus)
    //
    constructor(x, y, w, h, ctx){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = ctx;

        this.img = new Image();
        this.img.addEventListener("load", () =>{
            this.draw()
        })
        this.img.src = "docs/assets/images/noob.png";
        
    }
    
    draw(){
        
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    moveUp(){
        this.y -= 50;
    }
    moveDown(){
        this.y += 50;
    }
    moveLeft(){
        this.x -= 50;
    }
    moveRight(){
        this.x += 50;
    }
}