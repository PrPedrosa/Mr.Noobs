/**@type {HTMLCanvasElement} */
//2 game modes - 100waves(with difficulties)(bonus)
//leaderboard (bonus)
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//canvas is 400 by 400

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
                ctx.fillStyle = "AntiqueWhite";
                ctx.fillRect(i*50, j*50, 50, 50)
            }
            if(matrix[i][j] === 0){
                ctx.fillStyle = "grey";
                ctx.fillRect(i*50, j*50, 50, 50)
            } 
        }
    }
    
    for(let i = 0; i <= matrix.length-1; i += 1){
        ctx.lineWidth = 1
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(0, 50*i);
        ctx.lineTo(canvas.width, 50*i);
        ctx.stroke()
        ctx.closePath()
        
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(50*i, 0);
    ctx.lineTo(50*i, canvas.height);
    ctx.stroke()
    ctx.closePath()   
}
}


let startBtn = document.getElementById("start-btn");
let menuScreen = document.getElementById("menu-screen");
let canvasScreen = document.getElementById("canvas-div");
let goBackBtn = document.getElementById("go-back-arrow");

startBtn.addEventListener("click", () => {
    let noob = new Player(205, 205, 40, 40, this.ctx);
    let game = new Game(noob);  

    canvasScreen.style.display = "flex";
    menuScreen.style.display = "none";

    document.addEventListener('keydown', (e) => {
        switch (e.code) {
            case 'ArrowUp':
                if(noob.y > 55) noob.moveUp();
                break;
            case 'ArrowDown':
                if(noob.y < 305) noob.moveDown();
                break;
            case 'ArrowLeft':
                if(noob.x > 55) noob.moveLeft();
                break;
            case 'ArrowRight':
                if(noob.x < 305) noob.moveRight();
                break;
            }
        })
    game.startGame();

    goBackBtn.addEventListener("click", () => {
        game.gameOver = true;
        menuScreen.style.display = "flex";
        canvasScreen.style.display = "none";
    })
})






