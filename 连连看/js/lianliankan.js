var box = document.getElementsByClassName("box")[0];
var boxs = document.getElementsByClassName("box1");
var arr = [];
var arr1 = [];

function getRandom(minNum, maxNum) {
	return Math.round(Math.random() * (maxNum - minNum) + minNum);
}

function getRandomColor() {
	var r = getRandom(0, 255);
	var g = getRandom(0, 255);
	var b = getRandom(0, 255);
	return "rgb(" + r + "," + g + "," + b + ")";
}

function getIndex(maxNum) {
	var temp;
	while (true) {
		temp = getRandom(0, maxNum);
		if (arr.indexOf(temp) == -1) break;
	}
	arr.push(temp);
	return temp;
}

function checked() {
	var temp1 = arr1[arr1.length - 1];
	var temp2 = arr1[arr1.length - 2];
	if (temp2 != undefined && temp2 != temp1 && temp1.innerHTML == temp2.innerHTML) {
		temp1.remove();
		temp2.remove();
	}
}

function create() {
	for (let i = 0; i < 16; i++) {
		let div = document.createElement("div");
		div.className = "box1";
		div.style.backgroundColor = getRandomColor();
		box.appendChild(div);
	}
	
	box.onclick = function(event){
		if(event.target.className == "box") return;
		if(arr1.length != 0){
			arr1[arr1.length - 1].className = "box1";
		}
		arr1.push(event.target);
		arr1[arr1.length - 1].className = "box1 selected";
		checked();
	}
	
	for (let i = 0; i < 8; i++) {
		let temp = getRandom(100, 999);
		boxs[getIndex(15)].innerHTML = temp;
		boxs[getIndex(15)].innerHTML = temp;
	}
}

create();
