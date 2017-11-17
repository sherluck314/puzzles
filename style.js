var status = 0;
var count = 0;
window.onload = function() {
	load();
	document.getElementById("restart").addEventListener("click", random_place);
	document.getElementById("restore").addEventListener("click", restore);
	document.getElementById("change").addEventListener("click", change_picture);
}

function load() {//加载出原始拼图，动态添加HTML元素
	var p = document.getElementById("picture");
	for (var i = 1; i <= 16; i++) {
		var e = document.createElement("div");
		e.className = "each"+count+" "+"imgpos"+i;
		e.id = "part"+i;
		e.addEventListener("click", move);
		p.appendChild(e);
	}
}

function restore() {//重置拼图
	if (status != 0) {
		document.getElementById("restart").textContent = "重新开始";
	}
	for (var i = 1; i <= 16; i++) {
		var e = document.getElementById("part"+i);
		e.className = "each"+count+" "+"imgpos"+i;
	}
	status = 0;
	document.getElementById("win").textContent = "";
}

function check() {//检测拼图是否拼接完成
	for (var i = 1; i <= 16; i++) {
		var e = document.getElementById("part"+i);
		if (e.className != "each"+count+" "+"imgpos"+i) {
			return false;
		}
	}
	return true;
}

function if_adjacent(pos) {//交换空的拼图块与当前点击拼图块的位置
	var p = document.getElementById("part"+pos);
	var name = p.className;
	var flag = false;
	var arr = [parseInt(pos)-1, parseInt(pos)+1, parseInt(pos)-4, parseInt(pos)+4];//注意，不进行处理，会出现10+1=101情况
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] > 0 && arr[i] < 17) {
			var adj = document.getElementById("part"+arr[i]);
			if (adj.className == "each"+count+" imgpos16") {
				adj.className = name;
				p.className = "each"+count+" imgpos16";
				flag = true;
				break;
			}
		}
	}
	return flag;
}

function random_place(event) {//每次将空的拼图块与相邻的随机拼图块交换，交换若干次，这样就能确保拼图是可还原的。
	restore();
	document.getElementById("win").textContent = "游戏开始了哦";
	for (var i = 0; i < 500; i++) {
		if_adjacent(RandomNum(0, 16));
	}
	status = 1;
}

function move(event) {//点击后交换
	if (status == 0) {
		return;
	}
	if(check()) {
		document.getElementById("win").textContent = "恭喜恭喜成功啦！";
		status = 0;
		return;
	}
	var s = this.id.substring(4);
	if (if_adjacent(s)) {
		document.getElementById("win").textContent = "加油，你离成功越来越近了！";
	}
	else {
		document.getElementById("win").textContent = "要点击和空拼图块相邻的块块哦";
	}
}

function RandomNum(Min, Max) {//获得某个范围内的随机数
    var Range = Max - Min;
    var Rand = Math.random();
    if (Math.round(Rand * Range)==0){       
        return Min + 1;
    }
    var num = Min + Math.round(Rand * Range);
    return num;
}

function change_picture(event) {
	count = (count+1)%7;
	restore();
}