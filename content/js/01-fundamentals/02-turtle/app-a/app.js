import turtle from '/js/turtle.js';

let distance = 40;
let sides = 10;
let angle = 360 / sides;

turtle.setPosition(240, 100);

for (let i = 0; i < sides; i += 1) {
	turtle.forwards(distance);
	turtle.rotate(angle);
}

turtle.go();
