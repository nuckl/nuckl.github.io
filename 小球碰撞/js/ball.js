var box = document.getElementsByClassName("box")[0];
var balls = [];

//获取随机数
function getRandom(minNum, maxNum) {
	return Math.round(Math.random() * (maxNum - minNum) + minNum);
}

//获取随机颜色
function getRandomColor() {
	var r = getRandom(0, 255);
	var g = getRandom(0, 255);
	var b = getRandom(0, 255);
	return "rgb(" + r + "," + g + "," + b + ")";
}

//创建小球
function create() {
	for (let i = 0; i < getRandom(10, 20); i++) {
		let ball = document.createElement("div");
		let str = getRandom(50, 120) + "px";
		ball.className = "ball";
		ball.style.width = str;
		ball.style.height = str;
		ball.style.backgroundColor = getRandomColor();
		box.appendChild(ball);
		ball.maxHeight = box.clientHeight - ball.offsetHeight;
		ball.maxWidth = box.clientWidth - ball.offsetWidth;
		ball.ballX = getRandom(0,ball.maxWidth);
		ball.ballY = getRandom(0, ball.maxHeight);
		ball.directionX = 1;
		ball.directionY = 1;
		ball.speed = getRandom(1, 2);
		ball.radius = Math.floor(ball.offsetHeight / 2);
		balls.push(ball);
	}
}

//小球碰撞
function touch(ball) {
	var x1 = ball.circularX;
	var y1 = ball.circularY;
	var r1 = ball.radius;
	for (let i = 0; i < balls.length; i++) {
		if (ball != balls[i]) {
			var x2 = balls[i].circularX;
			var y2 = balls[i].circularY;
			var r2 = balls[i].radius;
			if (Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) <= Math.pow(r1 + r2, 2)) {
				if (x1 > x2) {
					if (y1 < y2) {
						ball.directionX = 1;
						ball.directionY = -1;
					} else if (y1 > y2) {
						ball.directionX = 1;
						ball.directionY = 1;
					} else {
						ball.directionX = 1;
					}
				} else if (x1 < x2) {
					if (y1 < y2) {
						ball.directionX = -1;
						ball.directionY = 1;
					} else if (y1 > y2) {
						ball.directionX = -1;
						ball.directionY = 1;
					} else {
						ball.directionX = -1;
					}
				} else{
					if(y1 > y2){
						ball.directionY = 1;
					}else{
						ball.directionY = -1;
					}
				}
			}
		}
	}
}

//小球移动
function move(ball) {
	setInterval(function() {
		ball.ballX += ball.speed * ball.directionX;
		ball.ballY += ball.speed * ball.directionY;

		ball.circularX = ball.ballX + ball.radius;
		ball.circularY = ball.ballY + ball.radius;

		ball.style.left = ball.ballX + "px";
		ball.style.top = ball.ballY + "px";
		
		touch(ball);
		
		if (ball.ballX <= 0 || ball.ballX >= ball.maxWidth) {
			ball.directionX *= -1;
		}

		if (ball.ballY <= 0 || ball.ballY >= ball.maxHeight) {
			ball.directionY *= -1;
		};
		
	}, 1);
}

//主函数
function run() {
	create();
	for (let j = 0; j < balls.length; j++) {
		move(balls[j]);
	}
}

run();
