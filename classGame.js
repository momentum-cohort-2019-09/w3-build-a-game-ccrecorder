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
			y : 267
		};

		let image = './fullDoody.png';

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

	addSquare() {
		// this.addBody(new Square({}))
	}

	addDoody() {}

	update() {}

	draw() {
		for (let body of this.bodies) {
			body.draw(this.screen);
		}
	}
}
