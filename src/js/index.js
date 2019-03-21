// var sheep = document.getElementsByClassName('sheep')[0];
// var tmepLeft = 0;
// var sheepWidth = 164;
// var speed = 10;
// function sheepRun(obj){
// 	clearInterval(obj.timer);
// 	obj.timer = setInterval(function () {
// 		tmepLeft += sheepWidth;
// 		if(tmepLeft == 1312){
// 			tmepLeft = 0;
// 		}
// 		if(sheep.offsetLeft <= -164){
// 			clearInterval(obj.timer);
// 			clearInterval(obj.timer1)
// 		}
// 		obj.style.left = obj.offsetLeft - speed + "px";
// 		obj.style.backgroundPosition = -tmepLeft + "px " + 0 + "px";
// 	}, 100);
// }


// sheep.addEventListener("mousedown", function (e) {
// 	var event = e || window.event,
// 		disX = event.clientX - this.offsetLeft,
// 		disY = event.clientY - this.offsetTop,
// 		_this = this;
// 	event.preventDefault();
// 	clearInterval(this.timer1);
// 	clearInterval(this.timer2);
// 	tmepLeft = 0;
// 	clearInterval(timer);
// 	this.timer1 = setInterval(function () {
// 			tmepLeft += sheepWidth;
// 			if(tmepLeft == 1148){
// 				clearInterval(_this.timer1);
// 				console.log(tmepLeft);
// 			}
// 			sheep.style.backgroundPosition = -tmepLeft + "px -" + 122 + "px";
// 		}, 100);
// 	document.addEventListener("mousemove", sheepMove, false);
// 	function sheepMove(e) {
// 		var event1 = e || window.event,
// 			newLeft = event1.clientX - disX,
// 			newTop = event1.clientY - disY;
// 		sheep.style.left = newLeft + "px";
// 		sheep.style.top = newTop + "px";
// 	}
// 	document.addEventListener("mouseup", function () {
// 		document.removeEventListener("mousemove", sheepMove, false);
// 		sheepDrop(_this);
// 		clearInterval(_this.timer2);
// 		sheepRun(_this);
// 	}, false);
// }, false);

// function sheepDrop(obj){
// 	var dropSpeed = 10;
// 	clearInterval(obj.timer1);
// 	clearInterval(obj.timer2);
// 	obj.timer1 = setInterval(function () {
// 		if(window.innerHeight <= obj.offsetHeight + obj.offsetTop){
// 			dropSpeed *= -0.9;
// 			obj.style.top = window.innerHeight - obj.offsetHeight;
// 		}else if(obj.offsetTop <= 0){
// 			dropSpeed *= -0.8;
// 			obj.style.top = 0;
// 		}
// 		if( window.innerHeight - obj.offsetHeight - obj.offsetTop < 1 && Math.abs(dropSpeed) <= 1){
// 			clearInterval(obj.timer1);
// 			obj.style.top = window.innerHeight - obj.offsetHeight;
// 		}else{
// 		}
// 			obj.style.top = obj.offsetTop + dropSpeed + "px";
// 	}, 30);
// }
// 
(function () {

	var target = {
		stage: document.getElementsByClassName('stage')[0],
		tmepLeft: 0,
		sheepWidth: 164,
		speed: 5,
		frepuency: 50,
		maxSheep: 8,
		sheeptop: 0,
		speedDrop: 10
	}

	function Sheep(data){
		
		for(var prop in data){
			if(data.hasOwnProperty(prop)){
				if(prop == "frepuency"){
					this[prop] = Math.floor(Math.random() * data[prop]) + 20;
				}else{

					this[prop] = data[prop];
				}
			}
		}
		this.sheep = document.createElement("div");
		this.stage.appendChild(this.sheep);
		this.sheep.className = "sheep";
	}
	init();
	function init() {
		createSheep();
	}

	function createSheep(){
		var timer = setInterval( function () {
			var sheepNum = target.stage.children.length;
			if(sheepNum >= target.maxSheep){
				return false;
			}else{
				var newsheep = new Sheep(target);
				sheepRun(newsheep);
			}
		}, 2000);
	}	
	function sheepRun(obj) {
		var timer1 = setInterval(function () {
			obj.tmepLeft += obj.sheepWidth;
			if(obj.tmepLeft == obj.sheepWidth * 8){
				obj.tmepLeft = 0;
			}
			if(obj.sheep.offsetLeft <= -obj.sheepWidth){
				clearInterval(timer1);
				// clearInterval(timer2);
				obj.stage.removeChild(obj.sheep);
			}
			obj.sheep.style.left = obj.sheep.offsetLeft - obj.speed + "px";
			obj.sheep.style.backgroundPosition = -obj.tmepLeft + "px " + obj.sheeptop + "px";
		}, obj.frepuency);

		
		
		obj.sheep.addEventListener("mousedown", function (e) {

			var event = e || window.event;
			obj.sheeptop = -122;
			obj.speed = 0;
			obj.x = event.pageX;
			obj.y = event.pageY;
			document.addEventListener("mousemove", sheepMove, false);
			function sheepMove(e){
				
				var event = e || window.event;
				obj.sheep.style.left = obj.sheep.offsetLeft + (event.pageX - obj.x) + 'px';
                obj.sheep.style.top = obj.sheep.offsetTop + (event.pageY - obj.y) + 'px';
                obj.x = event.pageX;
                obj.y = event.pageY;
			}
			document.addEventListener("mouseup", function () {
				// obj.sheeptop = 0;
                obj.speed = target.speed;
				document.removeEventListener("mousemove", sheepMove, false);
				sheepDrop(obj);
			}, false);
		}, false);
	}
	
	function sheepDrop(obj) {
			var g = 5;
			var sheepDropTimer = setInterval(function () {
				obj.speedDrop += g;
				obj.speedDrop = obj.speedDrop > 0 ? Math.ceil(obj.speedDrop) : Math.floor(obj.speedDrop);
				if(obj.sheep.offsetTop + obj.sheep.offsetHeight >= window.innerHeight){
					obj.speedDrop *= -0.6;
					obj.sheep.style.top = window.innerHeight - obj.speed.offsetHeight;
				} else if (obj.sheep.offsetTop <= 0) {
					obj.speedDrop *= -0.6;
					obj.sheep.style.top = 0;
				}
				if(Math.abs(obj.speedDrop) <= 4 && Math.abs(obj.sheep.offsetTop + obj.sheep.offsetHeight - window.innerHeight) < 4){
					clearInterval(sheepDropTimer);
					obj.sheep.style.top = window.innerHeight - obj.speed.offsetHeight;
					obj.sheeptop = 0;
				} else {
					obj.sheep.style.top = obj.sheep.offsetTop + obj.speedDrop + "px";
				}
			}, 50);
		}


} ());