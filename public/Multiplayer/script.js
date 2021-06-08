"use strict";

let size = 20;
let game = Number(document.getElementById("gamenum").innerHTML);

let table = document.createElement("table");

for (let i = 0; i < size; i++) {
	let row = document.createElement("tr");
	for (let j = 0; j < size; j++) {
		let box = document.createElement("td");
		box.setAttribute("id", String(size - i - 1) + " " + String(j));
		row.append(box);
	}
	table.appendChild(row);
}

document.body.append(table);

let keypress = 0;

document.body.onkeyup = (e) => {
	switch (e.keyCode) {
		case 39:
			keypress = 2;
			break;
		case 38:
			keypress = 1;
			break;
		case 40:
			keypress = 3;
			break;
		case 37:
			keypress = 4;
			break;
	}
	$.ajax({
		url: "update",
		method: "POST",
		data: {
			game: game,
			keypress: keypress,
		},
		success: function (data) {
			console.log(data);
		},
	});
};

setInterval(() => {
	$.ajax({
		url: "getFeld",
		method: "POST",
		success: function (data) {
			console.log(data);
			for (let i = 0; i < size; i++) {
				for (let j = 0; j < size; j++) {
					if (data[0][i][j].val > 0) {
						document.getElementById(String(i) + " " + String(j)).setAttribute("class", "black");
					} else {
						document.getElementById(String(i) + " " + String(j)).setAttribute("class", "white");
					}
				}
			}
			for (let i = 0; i < data[1].length; i++) {
				document.getElementById(String(data[1][i].y) + " " + String(data[1][i].x)).setAttribute("class", "apple");
			}
		},
	});
}, 300);
