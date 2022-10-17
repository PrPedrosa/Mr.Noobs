class Player {
    //cant move in grey area
    //one life shield? (bonus)
    constructor(x, y, w, h, ctx){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.frames = 0

        this.playerImg = new Image();
        this.playerImgSrc = ["docs/assets/images/stickman1.png", "docs/assets/images/stickman2.png"]
    }
    
    draw(){
        this.frames += 0.15;
        this.playerImg.src = this.playerImgSrc[Math.floor(this.frames % 2)];
        ctx.drawImage(this.playerImg, this.x, this.y, this.w, this.h);
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

    topPos(){
        return this.y;
    }
    bottomPos(){
        return this.y + this.h;
    }
    leftPos(){
        return this.x;
    }
    rightPos(){
        return this.x + this.w;
    }

    isTouching(enemy) {
        return (
          enemy.leftPos() < this.rightPos() &&
          enemy.rightPos() > this.leftPos() &&
          enemy.topPos() < this.bottomPos() &&
          enemy.bottomPos() > this.topPos()
        );
      }
}


/* rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y */