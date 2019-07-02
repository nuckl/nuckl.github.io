(function(){
	var lis = document.getElementsByTagName("li");
	var bg = document.getElementById("bg");
	var box = document.getElementsByClassName("box")[0];
	var clickLastIndex = 0;
	var lastFlag = 0;
	var width = lis[0].clientWidth;;
	var height = lis[0].clientHeight;
	var temp = 40;
	bg.style.width = width + "px";
	bg.style.height = height + "px";
	bg.style.left = "40px";
	
	change();
	
	function change(){
		for (let i = 0; i < lis.length; i++) {
			lis[i].onmouseenter = function(){
				clearInterval(bg.timerID);
				Tween.move(bg, "left", 1, lastFlag * width + 40, (this.index - lastFlag) * width, 1000);
				lastFlag = this.index;
			}
		}
	}
	
	
	for (let j = 0; j < lis.length; j++) {
		lis[j].index = j;
		lis[j].onclick = function(){
			lis[clickLastIndex].style.backgroundColor = "";
			lis[this.index].style.backgroundColor = "#cc0000";
			temp = this.index * width + 40;
			bg.style.left = temp + "px";
			lastFlag = this.index;
			change();
			clickLastIndex = this.index;
		};
	}
	
	box.onmouseleave = function(){
		clearInterval(bg.timerID);
		Tween.move(bg, "left", 1, lastFlag * width, temp - lastFlag * width, 1000);
		lastFlag = clickLastIndex;
	}
	
})();