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

		for (let square of squares) {
			square = new Square(square.x, square.y, square.z);
			this.addBody(square);
		}

		this.doody = new Doody(doodyLocation, doodySize);
		this.addBody(this.doody);
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
		// screen.clearRect(0, 0, canvas.width, canvas.height);
		this.screen.clearRect(0, 0, this.size.width, this.size.height);
		for (let body of this.bodies) {
			body.draw(this.screen);
		}
	}
}

class Doody {
	constructor(location, size) {
		this.location = location;
		this.size = size;
		this.moved = false;
	}

	inSamePosition() {}

	update(game) {
		// screen.clearRect(0, 0, size.width, size.height);
		if (game.keyboard.isDown(Keyboarder.KEYS.RIGHT)) {
			if (!this.moved) this.location.x += 36;
			this.moved = true;
		} else if (game.keyboard.isDown(Keyboarder.KEYS.LEFT)) {
			if (!this.moved) this.location.x -= 36;
			this.moved = true;
		} else if (game.keyboard.isDown(Keyboarder.KEYS.UP)) {
			if (!this.moved) this.location.y -= 36;
			this.moved = true;
		} else if (game.keyboard.isDown(Keyboarder.KEYS.DOWN)) {
			if (!this.moved) this.location.y += 36;
			this.moved = true;
		} else {
			this.moved = false;
		}
	}

	draw(screen) {
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

	update() {
		if (this.z === 0) {
			game.bodies.remove(this);
		}
	}

	draw(screen) {
		// screen.clearRect(0, 0, canvas.width, canvas.height);
		if (this.z === 1) {
			screen.fillStyle = '#FFFFFF';
			screen.fillRect(this.x, this.y, 36, 36);
		}
		if (this.z === 2) {
			screen.fillStyle = '#333333';
			screen.fillRect(this.x, this.y, 36, 36);
		}
		if (this.z === 3) {
			const toilet = document.getElementById('toilet');
			screen.drawImage(toilet, this.x, this.y, 36, 36);
		}

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
