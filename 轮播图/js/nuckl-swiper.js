(function() {
	var swiperContainer = document.getElementById("swiper-container");
	var container = document.getElementsByClassName("swiper-wrapper")[0];
	var swiperItems = document.getElementsByClassName("swiper-item");
	var paginations = document.getElementsByClassName("swiper-pagination")[0].getElementsByTagName("li");
	var length = swiperItems.length;
	var lastFlag = 0;
	var autoPlayId;
	var num = 0;

    swiperItems[0].style.display = "block";
	(function() {
		container.style.width = swiperContainer.clientWidth + "px";
		for (var i = 0; i < swiperItems.length; i++) {
			swiperItems[i].style.width = swiperContainer.clientWidth + "px";
		}
	})();
	
	function selected() {
		paginations[lastFlag].className = "";
		let index = num == length ? 0 : num;
		paginations[index].className = "pagination-selected";
		lastFlag = index;
	}
	
	$(document).ready(function() {
		function right() {
			num++;
			if(num == length){
				num = 0;
				$(".swiper-item").eq(length-1).fadeToggle(800);
				$(".swiper-item").eq(num).fadeToggle(800);
			} else {
				$(".swiper-item").eq(num).fadeToggle(800);
				$(".swiper-item").eq(num-1).fadeToggle(800);
			}
			selected();
		};
		
		function left() {
			num--;
			if(num == -1){
				num = 3;
				$(".swiper-item").eq(0).fadeToggle(800);
			} else {
				$(".swiper-item").eq(num+1).fadeToggle(800);
			}
			$(".swiper-item").eq(num).fadeToggle(800);
			selected();
		};
		
		$("#swiper-button-right").click(right);
		$("#swiper-button-left").click(left);
		
		for (let i = 0; i < paginations.length; i++) {
			paginations[i].index = i;
			paginations[i].onclick = function() {
				paginations[lastFlag].className = "";
				paginations[this.index].className = "pagination-selected";
				$(".swiper-item").eq(lastFlag).fadeToggle(800);
				$(".swiper-item").eq(this.index).fadeToggle(800);
				lastFlag = this.index;
				num = this.index;
			}
		}
		
		
		autoPlayId = setInterval(right, 3000);
		swiperContainer.onmouseleave = function() {
			clearInterval(autoPlayId);
			autoPlayId = setInterval(right, 3000);
		}
		swiperContainer.onmouseenter = function() {
			clearInterval(autoPlayId);
		}
	});
	
})();
