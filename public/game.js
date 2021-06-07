"use strict";

let size = 10;

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
};

setInterval(() => {
	$.ajax({
		url: "/update",
		method: "POST",
		data: {
			game: 0,
			keypress: keypress,
		},
		success: function (data) {
			for (let i = 0; i < size; i++) {
				for (let j = 0; j < size; j++) {
					if (data[0][i][j] > 0) {
						document.getElementById(String(i) + " " + String(j)).setAttribute("class", "black");
					} else {
						document.getElementById(String(i) + " " + String(j)).setAttribute("class", "white");
					}
				}
			}
			document.getElementById(String(data[1].y - 1) + " " + String(data[1].x - 1)).setAttribute("class", "apple");
		},
	});
}, 1000);
