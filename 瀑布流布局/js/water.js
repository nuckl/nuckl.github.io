var boxs = document.getElementsByClassName("box1");
var box = document.getElementsByClassName("box")[0];
var index = 1;

//获取随机数
function getRandom(minTop, maxNum) {
	return Math.round(Math.random() * (maxNum - minTop) + minTop);
}

//获取随机颜色
function getRandomColor() {
	var r = getRandom(0, 255);
	var g = getRandom(0, 255);
	var b = getRandom(0, 255);
	return "rgb(" + r + "," + g + "," + b + ")";
}

//获取高度最小的box
function getMinBox() {
	var minNum = Number.MAX_VALUE;
	var temp;
	for (let i = 0; i < boxs.length; i++) {
		var width = boxs[i].clientHeight;
		if (width < minNum) {
			minNum = width;
			temp = boxs[i];
		}
	}
	return temp;
}

//获取高度最大的box
function getMaxBox() {
	var maxNum = Number.MIN_VALUE;
	var temp;
	for (let i = 0; i < boxs.length; i++) {
		var width = boxs[i].clientHeight;
		if (width > maxNum) {
			maxNum = width;
			temp = boxs[i];
		}
	}
	return temp;
}

//创建一个div
function create(index) {
	var div = document.createElement("div");
	var str = getRandom(60, 200) + "px";
	div.className = "box2";
	div.style.height = str;
	div.innerHTML = index;
	div.style.lineHeight = str;
	div.style.backgroundColor = getRandomColor();
	getMinBox().appendChild(div);
}

//获取滚动距离
function getScrollTop(){
	return document.documentElement.scrollTop || document.body.scrollTop;
}

//获取窗口高度
function getClientHeight(){
	return document.documentElement.clientHeight || window.innerHeight;
}

function run(){
	for (let i = 0; i < 40; i++) {
		create(index++);
	}
}
run();

//监听窗口滑动
window.onscroll = function(){
	var maxHeight = getMaxBox().clientHeight;
	var scrollTop = getScrollTop() + getClientHeight();
	if(scrollTop > maxHeight){
		run();
	}
}

