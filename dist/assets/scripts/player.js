class Player {
	constructor(x, y, w, h, ctx) {
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.ctx = ctx
		this.frames = 0
		this.playerImg = new Image()
		this.playerImgSrc = [
			"assets/images/stickman1.png",
			"assets/images/stickman2.png"
		]
	}

	draw() {
		this.frames += 0.15
		this.playerImg.src = this.playerImgSrc[Math.floor(this.frames % 2)]
		ctx.drawImage(this.playerImg, this.x, this.y, this.w, this.h)
	}

	moveUp() {
		this.y -= 50
	}
	moveDown() {
		this.y += 50
	}
	moveLeft() {
		this.x -= 50
	}
	moveRight() {
		this.x += 50
	}

	topPos() {
		return this.y + 10
	}
	bottomPos() {
		return this.y + this.h - 10
	}
	leftPos() {
		return this.x + 10
	}
	rightPos() {
		return this.x + this.w - 10
	}

	isTouching(enemy) {
		return (
			enemy.leftPos() < this.rightPos() &&
			enemy.rightPos() > this.leftPos() &&
			enemy.topPos() < this.bottomPos() &&
			enemy.bottomPos() > this.topPos()
		)
	}
}
