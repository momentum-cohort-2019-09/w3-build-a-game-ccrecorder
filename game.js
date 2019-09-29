const colors = {
	z1    : '#BBBBBB',
	z2    : '#333333',
	doody : 'rgb(92, 64, 27)'
};

class Game {
	constructor(canvasId) {
		let canvas = document.getElementById(canvasId);
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

		let doodyLocation = squares[0].location;

		let squareLocation = squares[0].location;
	}

	begin() {
		let doody = new Doody(this, this.size);

		let tick = () => {
			this.update();
			this.draw(this.screen, this.size);
			requestAnimationFrame(tick);
			this.createSquare();
		};
		tick();
	}

	update() {
		console.log('update method');
		// if (make line about missing a square) this.gameOver = true
	}

	draw() {}

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
		console.log('update function Square');
	}

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
	constructor(game, doodyLocation, doodySize) {
		this.game = game;
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

window.addEventListener('load', function() {
	let game = new Game('game-canvas');
	game.begin();
});
