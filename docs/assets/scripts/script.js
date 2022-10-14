/**@type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let matrix = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
]

let drawBoard = () => {
    
    
    for(let i = 0; i <= matrix.length-1; i +=1){
        for(let j = 0; j <= matrix.length-1; j +=1){
            if(matrix[i][j] === 1){
                ctx.fillStyle = "grey";
                ctx.fillRect(i*100, j*100, 100, 100)
            }
            if(matrix[i][j] === 0){
                ctx.fillStyle = "AntiqueWhite";
                ctx.fillRect(i*100, j*100, 100, 100)
            } 
        }
    }
    
    for(let i = 0; i <= matrix.length-1; i += 1){
        ctx.lineWidth = 3
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(0, 100*i);
        ctx.lineTo(canvas.width, 100*i);
        ctx.stroke()
        ctx.closePath()
        
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(100*i, 0);
    ctx.lineTo(100*i, canvas.height);
    ctx.stroke()
    ctx.closePath()   
}
}
/* class Game {
    constructor (player, draw){
        this.player = player;
        this.draw = draw
    }

    
    
        drawBoard(){
            this.draw
        }
    
    
    update() {
        
        drawBoard();  
        this.player.drawNoob();
        console.log("updating");
        requestAnimationFrame(update);
        
    }
    start(){
        drawBoard();
        this.player.drawNoob();
        this.update() 
        setInterval(this.update, 1000/60);
    }


} */



let player = {
    x: 400,
    y: 400,
    w: 80,
    h: 80,

    drawNoob(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.w, this.h); 
    },

    moveUp(){
        this.y -= 100;
    },
    moveDown(){
        this.y += 100;
    },
    moveLeft(){
        this.x -= 100;
    },
    moveRight(){
        this.x += 100;
    },

}


 function update() {
    drawBoard();  
    player.drawNoob();
    console.log("updating");
    requestAnimationFrame(update);  //cancelling?
} 




document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowUp':
        player.moveUp();
        break;
        case 'ArrowDown':
            player.moveDown();
            break;
            case 'ArrowLeft':
                player.moveLeft();
                break;
                case 'ArrowRight':
        player.moveRight();
        break;
    }
})


let button = document.getElementById("start")
button.addEventListener("click", (e) =>{
     drawBoard();
    player.drawNoob();
    update(); 
    
    //game.start();
})
//let game = new Game(player, drawBoard)

