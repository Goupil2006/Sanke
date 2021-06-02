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
	games.push(new Game(4));
	res.render("game", { gamenum: games.length - 1 });
});

app.listen("5050", () => {
	console.log("Server ist Gestartet");
});
