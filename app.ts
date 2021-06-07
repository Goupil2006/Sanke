const express = require("express");
const app = express();
const Game = require("./Game.ts");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));

let games: any = [];

app.get("/", (req: any, res: any) => {
	res.render("index");
});

app.get("/newgame", (req: any, res: any) => {
	games.push("");
	games[games.length - 1] = new Game(20);
	console.log(games);
	res.render("game", { gamenum: games.length - 1 });
});

app.post("/update", (req: any, res: any) => {
	let game: number = Number(req.body.game);
	if (req.body.keypress) {
		let keypress: number = req.body.keypress;
		games[game].update(keypress);
	} else {
		games[game].update(0);
	}
	console.log(games);
	res.send([games[game].Feld, games[game].position_apple]);
});

app.listen("3000", () => {
	console.log("Server ist Gestartet");
});
