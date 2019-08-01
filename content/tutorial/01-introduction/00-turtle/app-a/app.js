import Turtle from './turtle.js';

let div = document.createElement('div');
document.body.appendChild(div);

const canvas = new Two({
	width: 360,
	height: 270
}).appendTo(div);

var turtle = new Turtle(canvas)
let distance = 40;
let sides = 10;
let angle = 360 / sides;

turtle.setPosition(240, 100);

for (let i = 0; i < sides; i += 1) {
	turtle.forwards(distance);
	turtle.rotate(angle);
}

turtle.go();
