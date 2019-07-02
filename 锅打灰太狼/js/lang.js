var progress = document.querySelectorAll(".progress")[0];
var content = document.querySelectorAll(".content")[0];
var gameOver = document.querySelectorAll(".gameOver")[0];
var menu = document.querySelectorAll(".menu")[0];
var gameStar = document.querySelectorAll(".gameStar")[0];
var scro = document.querySelectorAll(".scro")[0];

var arrPosi = [{
	l: "98px",
	t: "115px"
}, {
	l: "17px",
	t: "160px"
}, {
	l: "15px",
	t: "220px"
}, {
	l: "30px",
	t: "293px"
}, {
	l: "122px",
	t: "273px"
}, {
	l: "207px",
	t: "295px"
}, {
	l: "200px",
	t: "211px"
}, {
	l: "187px",
	t: "141px"
}, {
	l: "100px",
	t: "185px"
}];

var arrIndex = [true, true, true, true, true, true, true, true, true];
var timeID;

function progressChange() {
	var timeid;
	timeid = setInterval(function() {
		progress.style.width = (progress.offsetWidth - 2) + "px";
		if (progress.offsetWidth <= 0) {
			clearInterval(timeID);
			clearInterval(timeid);
			setTimeout(function(){
				gameOver.style.display = "block";
				setTimeout(function(){
					gameOver.style.display = "none";
					progress.style.width = "180px";
					scro.innerHTML = "0";
					menu.style.display = "block";
				}, 2000);
			},1000)
		}
	}, 100);
}

function getRandom(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}


function createLang() {
    var img = document.createElement("img");
	img.pos = getRandom(0, arrPosi.length - 1);
	if(!arrIndex[img.pos]) return createLang;
	arrIndex[img.pos] = false;
	img.obj = arrPosi[img.pos];
	img.index = 0;
	img.type = getRandom(0, 100) > 80 ? "x" : "h";
	img.style.left = img.obj.l;
	img.style.top = img.obj.t;
	img.clickState = true;  //记录点击状态
	img.onclick = function(){
		if(!img.clickState) return createLang;
		img.clickState = false;
		clearInterval(img.up);
		clearInterval(img.down);
		if(img.type == "h"){
			progress.style.width = (progress.offsetWidth + 10) + "px";
			scro.innerHTML = parseInt(scro.innerHTML) + 10;
		}else{
			progress.style.width = (progress.offsetWidth - 10) + "px";
			scro.innerHTML = parseInt(scro.innerHTML) - 10;
		}
		img.index = 6;
		after();
		function after(){
			img.src = "img/" + img.type + img.index++ + ".png";
			if(img.index > 9){
				img.remove();
				arrIndex[img.pos] = true;
				return createLang;
			}
		    setTimeout(after, 100);
		}
	}
	content.appendChild(img);
	img.up = setInterval(function() {
		img.src = "img/" + img.type + img.index++ + ".png";
		if (img.index > 5) {
			clearInterval(img.up);
			img.down = setInterval(function(){
				img.index--;
				img.src = "img/" + img.type + --img.index + ".png";
				if(img.index < 0){
					clearInterval(img.down);
					img.remove();
					arrIndex[img.pos] = true;
					}
			}, 200)
		}
	}, 200)
	return createLang;
}

gameStar.onclick = function() {
	menu.style.display = "none";
	progressChange();
	timeID = setInterval(createLang(), 500);
}
