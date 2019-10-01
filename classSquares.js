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
