class Game {
	constructor(canvasId) {
		let canvas = document.getElementById(canvasId);
		this.screen = canvas.getContext('2d');
		this.size = { width: canvas.width, height: canvas.height };
		this.keyboard = new Keyboarder();
		this.levelComplete = false;
		this.gameOver = false;
		this.squares = [];

		for (let square of squares) {
			square = new Square(this, square.x, square.y, square.z);
			this.squares.push(square);
		}
	}

	begin() {
		let doody = new Doody(this);
		this.squares.push(doody);
		// console.log(squares);
		let tick = () => {
			this.update();
			this.draw(this.screen, this.size);
			requestAnimationFrame(tick);
			// this.createSquare();
		};
		tick();
	}

	update() {
		// console.log('update method');
		// if (make line about missing a square) this.gameOver = true
	}

	render(screen, square) {
		if (square.z === 1) {
			screen.fillStyle = '#FFFFFF';
		}
		if (square.z === 2) {
			screen.fillStyle = '#333333';
		}
		screen.fillRect(square.x, square.y, 36, 36);
		screen.strokeRect(square.x, square.y, 36, 36);
	}

	draw(screen, size) {
		screen.clearRect(0, 0, size.width, size.height);
		for (let square of this.squares) {
			this.render(screen, square);
		}
		screen.drawImage(image, 331, 303, 36, 36);
	}

	createSquare() {
		for (let square of this.squares) {
			square.draw(this.screen);
		}
	}
}

class Square {
	constructor(game, x, y, z) {
		this.game = game;
		this.x = x;
		this.y = y;
		this.z = z;
	}

	update(game) {
		if (square.z === 0) {
			square.remove();
		}
	}
}

class Doody {
	constructor(game) {
		this.game = game;
		// this.doodyLocation = {square.x, square.y};
		this.jumping = false;
		this.keyboarder = new Keyboarder();
		let image = new Image();
		image.src = './fullDoody.png';
		// screen.drawImage(image, 331, 267, 36, 36);
	}

	update(game) {
		if (game.keyboard.isDown(Keyboarder.KEYS.RIGHT) && !this.jumping) {
			this.jumping = true;
			this.doodyLocation.x += 36;
		}
		if (game.keyboard.isDown(Keyboarder.KEYS.LEFT) && !this.jumping) {
			this.jumping = true;
			this.doodyLocation.x -= 36;
		}
		if (game.keyboard.isDown(Keyboarder.KEYS.UP) && !this.jumping) {
			this.jumping = true;
			this.doodyLocation.y -= 36;
		}
		if (game.keyboard.isDown(Keyboarder.KEYS.DOWN) && !this.jumping) {
			this.jumping = true;
			this.doodyLocation.y += 36;
		}
	}

	draw(screen) {
		screen.drawImage('image', 331, 267, 36, 36);
	}
}

class Keyboarder {
	constructor() {
		this.keyState = {};

		window.addEventListener(
			'keydown',
			function(e) {
				this.keyState[e.keyCode] = true;
			}.bind(this)
		);

		window.addEventListener(
			'keyup',
			function(e) {
				this.keyState[e.keyCode] = false;
			}.bind(this)
		);
	}

	isDown(keyCode) {
		return this.keyState[keyCode] === true;
	}

	on(keyCode, callback) {
		window.addEventListener('keydown', function(e) {
			if (e.keyCode === keyCode) {
				callback();
			}
		});
	}
}

Keyboarder.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, S: 83 };

window.addEventListener('load', function() {
	let game = new Game('game-canvas');
	game.begin();
});
