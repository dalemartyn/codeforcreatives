import turtle from '/js/turtle.js';

turtle.setPosition(250, 120);

let sides = 7;
let angle = 360 / sides;
let length = 90;

let i = 0;
let j = 0;
while (j < 36) {
	while (i < sides) {
		turtle.forwards(length);
		turtle.rotate(angle);
		i += 1;
	}
	i = 0;
	turtle.rotate(10);
	j += 1;
}

turtle.go();
