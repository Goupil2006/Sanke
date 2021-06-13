import express from "express";
var router = express.Router();
var Multiplayergames = require("./Multiplayergame.ts");

var Multiplayergame = new Multiplayergames(40);

var MultiplayerParty: any = [];

router.get("/", (req: any, res: any) => {
	let gamenum = Multiplayergame.newPlayer();
	res.render("multiplayer", { gamenum: gamenum });
});

router.post("/update", (req: any, res: any) => {
	Multiplayergame.changedirection(Number(req.body.game), Number(req.body.keypress));
	res.send("gut");
});

router.post("/getFeld", (req: any, res: any) => {
	res.send([
		Multiplayergame.Feld,
		Multiplayergame.position_apples,
		Multiplayergame.Players[req.body.game].x,
		Multiplayergame.Players[req.body.game].y,
	]);
});

router.get("/Party", (req: any, res: any) => {
	let gamenum = Multiplayergame.newPlayer();
	res.render("multiplayer", { gamenum: gamenum });
});

router.post("/Party/update", (req: any, res: any) => {
	Multiplayergame.changedirection(Number(req.body.game), Number(req.body.keypress));
	res.send("gut");
});

router.post("/Party/getFeld", (req: any, res: any) => {
	res.send([
		Multiplayergame.Feld,
		Multiplayergame.position_apples,
		Multiplayergame.Players[req.body.game].x,
		Multiplayergame.Players[req.body.game].y,
	]);
});

module.exports = router;
