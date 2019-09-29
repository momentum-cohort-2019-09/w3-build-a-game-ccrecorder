const colors = {
	z1    : '#BBBBBB',
	z2    : '#333333',
	doody : 'rgb(92, 64, 27)'
};

class Game {
	constructor(canvasId) {
		const canvas = document.getElementById(canvasId);
		this.screen = canvas.getContext('2d');
		this.size = { width: canvas.width, height: canvas.height };
		this.keyboard = new Keyboarder();
		this.levelComplete = false;
		this.gameOver = false;
		this.squares = squares;

		let squareSize = {
			width  : 36,
			height : 36
		};
		let doodySize = {
			width  : 36,
			height : 36
		};

		let doodyLocation = square[0].location;

		this.doody = new Doody(doodyLocation, doodySize);

		this.square = new Square(squareLocation, squareSize);
	}

	run() {
		const tick = () => {
			this.update();
			this.draw();

			if (!this.gameOver) {
				window.requestAnimationFrame(tick);
			}
		};

		tick();
	}

	udpate() {
		for (let square of this.squares) {
			square.update(this);
			// if (make line about missing a square) this.gameOver = true
		}
	}

	draw() {
		for (let square of this.squares) {
			square.draw(this.screen);
		}
	}
	createSquare(x, y, z) {}
}

class Square {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	update(game) {}

	draw(screen) {
		for (let square of this.squares) {
			if (this.square.z === 1) {
				screen.fillStyle = colors.z1;
			}
			if (this.square.z === 2) {
				screen.fillStyle = colors.z2;
			}
			screen.fillRect(this.square.x, this.square.y, squareSize.width, squareSize.height);
		}
		// screen.fillRect(this.square.x, this.square.y, squareSize.width, squareSize.height);
	}
}

class Doody {
	constructor(doodyLocation, doodySize) {
		this.doodyLocation = doodyLocation;
		this.doodySize = doodySize;
		this.jumping = false;
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
		screen.fillStyle = colors.doody;
		screen.fillRect();
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

const game = new Game('game-canvas');
game.run();
