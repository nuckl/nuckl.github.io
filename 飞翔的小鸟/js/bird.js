var wrap = document.querySelectorAll(".wrap")[0];
var grass = document.querySelectorAll(".grass")[0];
var bird = document.querySelectorAll(".bird")[0];
var birdImg = document.querySelectorAll(".bird>img")[0];
var menu = document.querySelectorAll(".menu")[0];
var gameStar = document.querySelectorAll(".menu>.gameStar")[0];
var pipes = document.querySelectorAll(".pipes")[0];
var score1 = document.querySelectorAll(".wrap>.score")[0];
var score2 = document.querySelectorAll(".message>.score")[0];
var best = document.querySelectorAll(".message>.best")[0];
var img = document.querySelectorAll(".wrap>.score>img");
var message = document.querySelectorAll(".message")[0];
var reStart = document.querySelectorAll(".reStart")[0];
var musicClick = document.querySelectorAll(".musicClick")[0];
var musicOver = document.querySelectorAll(".musicOver")[0];
var musicStart = document.querySelectorAll(".musicBg")[0];


//草坪的移动
function grassMove() {
	grass.left = 0;
	grass.innerHTML += grass.innerHTML;
	setInterval(function() {
		grass.left -= 1;
		if (grass.left <= -343) {
			grass.left = 0;
		}
		grass.style.left = grass.left + "px";
	}, 10)
}

//小鸟向下飞
function birdFly() {
	bird.speed = 0; //小鸟的速度
	bird.lastTop = 200;
	setInterval(function() {
		bird.speed += 0.5;
		if (bird.speed >= 10) {
			bird.speed = 10;
		}
		var birdTop = bird.offsetTop + bird.speed;
		if (birdTop < bird.lastTop) {
			birdImg.src = "img/up_bird.png";
		} else {
			birdImg.src = "img/down_bird.png";
		}
		var maxTop = grass.offsetTop - bird.offsetHeight;
		if (birdTop <= 0) {
			birdTop = 0;
			gameOver();
		}
		if (birdTop >= maxTop) {
			birdTop = maxTop;
			gameOver();
		}
		bird.style.top = birdTop + "px";
		bird.lastTop = birdTop;
	}, 35)
}

// 游戏结束
function gameOver() {
	best.innerHTML = localStorage.best;
	message.style.display = "block";
	musicStart.pause();
	musicOver.play();
	document.onclick = null;
	var timerId = setInterval(function() {}, 1);
	for (var i = 1; i <= timerId; i++) {
		clearInterval(i);
	}
}

// 获取随机数
function getRandom(minNum, maxNum) {
	return Math.round(Math.random() * (maxNum - minNum) + minNum);
}


// 创建管道
function createPipe() {
	var li = document.createElement("li");
	li.className = "pipe";
	li.scoreFlag = false;
	pipes.appendChild(li);
	var up_pipe = document.createElement("div");
	up_pipe.className = "up_pipe";
	up_pipe.style.height = getRandom(100, 200) + "px";
	li.appendChild(up_pipe);
	var down_pipe = document.createElement("div");
	down_pipe.className = "down_pipe";
	down_pipe.style.height = li.offsetHeight - up_pipe.offsetHeight - 150 + "px";
	li.appendChild(down_pipe);
	li.left = 0;
	li.timer = setInterval(function() {
		crashChecked();
		li.left += 1;
		li.style.left = -li.left + "px";
		scoreChange(li);
		if (li.left > wrap.offsetWidth + li.offsetWidth) {
			clearInterval(li.timer);
			li.remove();
		}
	}, 10);
	return createPipe;
}

// 分数改变
function scoreChange(li) {
	if (Math.abs(li.offsetLeft) + bird.offsetLeft - li.offsetWidth >= wrap.offsetWidth && !li.scoreFlag) {
		li.scoreFlag = true;
		var num1 = parseInt(score2.innerHTML) + 1;
		if (num1 < 10) {
			img[2].src = "img/" + num1 + ".jpg";
		}
		if (num1 >= 10 && num1 < 100) {
			img[1].style.visibility = "visible";
			img[2].src = "img/" + num1 % 10 + ".jpg";
			img[1].src = "img/" + Math.floor(num1 / 10) + ".jpg";
		}
		if (num1 >= 100 && num1) {
			img[0].style.visibility = "visible";
			img[2].src = "img/" + num1 % 100 + ".jpg";
			img[1].src = "img/" + Math.floor(num1 % 100 / 10) + ".jpg";
			img[0].src = "img/" + Math.floor(num1 / 100) + ".jpg";
		}
		score2.innerHTML = num1;
		if (localStorage.best) {
			var num2 = parseInt(localStorage.best);
			if (num1 > num2) {
				localStorage.best = num1;
			}
		} else {
			localStorage.best = num1;
		}
	}
}

// 检测碰撞
function crashChecked() {
	var lis = document.querySelectorAll("li");
	for (var i = 0; i < lis.length; i++) {
		if (isCrash(bird, lis[i].firstChild) || isCrash(bird, lis[i].lastChild)) {
			gameOver();
		}
	}
}

// 判断是否碰撞
function isCrash(obj1, obj2) {
	var flag = false;

	var left1 = obj1.offsetLeft;
	var right1 = obj1.offsetLeft + obj1.offsetWidth;
	var top1 = obj1.offsetTop;
	var bottom1 = obj1.offsetTop + obj1.offsetHeight;
    
	var left2 = wrap.offsetWidth - Math.abs(obj2.parentElement.offsetLeft);
	var right2 = wrap.offsetWidth - Math.abs(obj2.parentElement.offsetLeft) + obj2.offsetWidth;
	var top2 = obj2.offsetTop;
	var bottom2 = obj2.offsetTop + obj2.offsetHeight;
	if (right1 >= left2 && left1 <= right2 && bottom1 >= top2 && top1 <= bottom2) {
		flag = true;
	}
	return flag;
}

// 开始游戏
function run() {
	if(!localStorage.best){
		localStorage.best = "0";
	}
	musicStart.play();
	musicStart.loop = true;
	menu.style.display = "none";
	img[2].style.visibility = "visible";
	bird.style.display = "block";
	grassMove();
	birdFly();
	document.onclick = function(event) {
		musicClick.play();
		bird.speed = -8;
		event.cancelBubble = true;
		event.stopPropagation();
	}
	var pipeTimer = setInterval(createPipe(), 2000);
}

gameStar.onclick = function(event) {
	run();
	event.stopPropagation();
	event.cancelBubble = true;
}


