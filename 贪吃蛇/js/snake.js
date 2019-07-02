var wrap = document.querySelectorAll(".wrap")[0];
var h2 = document.querySelectorAll("h2")[0];
var div = document.querySelectorAll("div")[0];

// 初始化格子尺寸
var width = 20;
var height = 30;
var tdLength = 20;

for (let i = 0; i < height; i++) {
	let tr = document.createElement("tr");
	wrap.appendChild(tr);
	for (let j = 0; j < width; j++) {
		let td = document.createElement("td");
		td.style.width = tdLength + "px";
		td.style.height = tdLength + "px";
		wrap.appendChild(td);
	}
}
var tds = document.querySelectorAll("td");

// 蛇
var snake = {
	direction: "down",
	arr: [{
		x: 12,
		y: 10
	}, {
		x: 12,
		y: 9
	}, {
		x: 12,
		y: 8
	}],
	run: function() {
		var obj = {};
		switch (snake.direction) {
			case "up":
				{
					obj.x = snake.arr[0].x;
					obj.y = snake.arr[0].y - 1;
					break;
				}
			case "down":
				{
					obj.x = snake.arr[0].x;
					obj.y = snake.arr[0].y + 1;
					break;
				}
			case "left":
				{
					obj.x = snake.arr[0].x - 1;
					obj.y = snake.arr[0].y;
					break;
				}
			case "right":
				{
					obj.x = snake.arr[0].x + 1;
					obj.y = snake.arr[0].y;
					break;
				}
		}
		for (let obj1 of snake.arr) {
			if(obj1.x == obj.x && obj1.y == obj.y){
				gameOver();
				return;
			}
		}
		if (obj.x >= width || obj.x < 0 || obj.y >= height || obj.y < 0) {
			gameOver();
			return;
		}
		tds[obj.y * width + obj.x].className = "color";
		if (obj.x == food.x && obj.y == food.y) {
			h2.innerHTML = parseInt(h2.innerHTML) + 1;
			snake.arr.unshift(obj);
			food.change();
			return;
		}
		snake.arr.unshift(obj);
		var tempObj = snake.arr.pop();
		tds[tempObj.y * width + tempObj.x].className = "";
	}
}

// 获取一个随机数
function getRandom(minNum, maxNum) {
	return Math.round(Math.random() * (maxNum - minNum) + minNum);
}

// 食物
var food = {
	change: function() {
		food.x = getRandom(0, width - 1);
		food.y = getRandom(0, height - 1);
		for (let obj of snake.arr) {
			if(food.x == obj.x && food.y == obj.y){
				food.change();
			}
		}
		tds[food.y * width + food.x].className = "food";
	}													
};

// 键盘事件
function keydown(event) {
	switch (event.keyCode) {
		case 37:
			{
				if(snake.direction == "right") return;
				snake.direction = "left";
				break;
			}
		case 38:
			{
				if(snake.direction == "down") return;
				snake.direction = "up";
				break;
			}
		case 39:
			{
				if(snake.direction == "left") return;
				snake.direction = "right";
				break;
			}
		case 40:
			{
				if(snake.direction == "up") return;
				snake.direction = "down";
				break;
			}
	}
}

// 游戏结束
function gameOver(){
	var timeid = setInterval(function(){},1);
	for(let i = 1; i <= timeid; i++){
		clearInterval(i);
	}
	alert("游戏结束");
}


function touchMove(){
	touch.on(document.documentElement, "swiperight", function(){
		if(snake.direction == "left") return;
		snake.direction = "right";
	})
	touch.on(document.documentElement, "swipeleft", function(){
		if(snake.direction == "right") return;
		snake.direction = "left";
	})
	touch.on(document.documentElement, "swipeup", function(){
		if(snake.direction == "down") return;
		snake.direction = "up";
	})
	touch.on(document.documentElement, "swipedown", function(){
		if(snake.direction == "up") return;
		snake.direction = "down";
	})
}

(function() {
	div.style.width = wrap.offsetWidth + "px";
	div.style.height = wrap.offsetHeight + "px";
	food.change();
	for (var i = 0; i < snake.arr.length; i++) {
		tds[snake.arr[i].y * width + snake.arr[i].x].className = "color";
	}
	setInterval(snake.run, 300);
	touchMove();
	document.addEventListener("keydown", keydown);
})()

