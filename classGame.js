class Game {
	constructor(canvasId) {
		let canvas = document.getElementById(canvasId);
		this.screen = canvas.getContext('2d');
		this.size = { width: canvas.width, height: canvas.height };
		this.keyboard = new Keyboarder();
		this.levelComplete = false;
		this.gameOver = false;
		this.bodies = [];

		const img = document.getElementById('imageId').onload;

		let doodySize = {
			width  : 36,
			height : 36
		};

		let doodyLocation = {
			x : 331,
			y : 267
		};

		this.doody = new Doody(doodyLocation, doodySize);
		this.addBody(this.doody);

		for (let square of squares) {
			square = new Square(square.x, square.y, square.z);
			this.addBody(square);
		}
	}

	addBody(body) {
		this.bodies.push(body);
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

	update() {}

	draw() {
		// screen.clearRect(0, 0, this.size.width, this.size.height);
		for (let body of this.bodies) {
			body.draw(this.screen);
		}
	}
}

class Doody {
	constructor(location, size) {
		this.location = location;
		this.size = size;
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
		screen.fillStyle = '#3D2D17';
		screen.fillRect(331, 267, 36, 36);
		screen.strokeRect(331, 267, 36, 36);
		// screen.drawImage(img, this.location.x, this.location.y, this.size.x, this.size.y);
	}
}

class Square {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	update() {}

	draw(screen) {
		if (square.z === 1) {
			screen.fillStyle = '#FFFFFF';
		}
		if (square.z === 2) {
			screen.fillStyle = '#333333';
		}
		screen.fillRect(square.x, square.y, 36, 36);
		screen.strokeRect(square.x, square.y, 36, 36);
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
	game.run();
});
