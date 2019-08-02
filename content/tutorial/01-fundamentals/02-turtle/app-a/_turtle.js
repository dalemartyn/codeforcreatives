class Turtle {

	constructor(canvas) {
		this.canvas = canvas;

		this.position = {
			y: 100,
			x: 300
		};

		this.direction = 90;
		this.commands = [];
	}

	setPosition(x, y) {
		this.position = {
			x,
			y
		};
	}

	forwards(distance) {
		this.commands.push({
			type: "forwards",
			value: distance
		});
	}

	rotate(angle) {
		this.commands.push({
			type: "rotate",
			value: angle
		});
	}

	go() {
		let points = [
			this.position.x,
			this.position.y
		];

		for (let command of this.commands) {
			if (command.type == "forwards") {
				let distance = command.value;
				let angle = 2 * Math.PI * (this.direction / 360);
				let dx = Math.cos(angle) * distance;
				let dy = Math.sin(angle) * distance;
				this.position = {
					x: this.position.x + dx,
					y: this.position.y + dy
				};
				points.push(this.position.x);
				points.push(this.position.y);
			} else if (command.type == "rotate") {
				let rotation = (this.direction + command.value) % 360;
				if (rotation < 0) rotation += 360;
				this.direction = rotation;
			}
		}

		let path = this.canvas.makePath.apply(this.canvas, points);
		path.stroke = '#000';
		path.linewidth = 1.5;
		this.canvas.update();
	}
}

const canvas = new Two({
	width: 360,
	height: 270
}).appendTo(document.body);

var turtle = new Turtle(canvas);

export default turtle;
