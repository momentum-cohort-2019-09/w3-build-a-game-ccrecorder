class Game {
	constructor(canvasId) {
		let canvas = document.getElementById(canvasId);
		this.screen = canvas.getContext('2d');
		this.size = { width: canvas.width, height: canvas.height };
		this.keyboard = new Keyboarder();
		this.levelComplete = false;
		this.gameOver = false;
		this.bodies = [];

		let doodySize = {
			width  : 36,
			height : 36
		};

		let doodyLocation = {
			x : 331,
			y : 339
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

	update() {
		for (let body of this.bodies) {
			body.update(this);
		}
	}

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
	}

	update(game) {
		if (game.keyboard.isDown(Keyboarder.KEYS.RIGHT)) {
			this.location.x += 36;
		}
		if (game.keyboard.isDown(Keyboarder.KEYS.LEFT)) {
			this.location.x -= 36;
		}
		if (game.keyboard.isDown(Keyboarder.KEYS.UP)) {
			this.location.y -= 36;
		}
		if (game.keyboard.isDown(Keyboarder.KEYS.DOWN)) {
			this.location.y += 36;
		}
	}

	draw(screen) {
		// screen.fillStyle = '#3D2D17';
		// screen.fillRect(331, 339, 36, 36);
		// screen.strokeRect(331, 339, 36, 36);
		const img = document.getElementById('imageId');
		screen.drawImage(img, this.location.x, this.location.y, this.size.width, this.size.height);
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
		if (this.z === 1) {
			screen.fillStyle = '#FFFFFF';
		}
		if (this.z === 2) {
			screen.fillStyle = '#333333';
		}
		screen.fillRect(this.x, this.y, 36, 36);
		screen.strokeRect(this.x, this.y, 36, 36);
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
