import { RSA_NO_PADDING } from "constants";
import express from "express";
var router = express.Router();
var Multiplayergames = require("./Multiplayergame.ts");

var Multiplayergame = new Multiplayergames(40, 100);

var MultiplayerPartys: any = { "1": new Multiplayergames(50, 100) };

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

router.get("/newParty", (req: any, res: any) => {
	res.render("createMultiplayer");
});

router.post("/newParty", (req: any, res: any) => {
	let id = Math.random().toString(36).substring(7);
	MultiplayerPartys[String(id)] = new Multiplayergames(Number(req.body.size), Number(req.body.speed));

	//Router Functions
	router.get(`/${id}`, (req: any, res: any) => {
		let game = MultiplayerPartys[String(id)].newPlayer();
		res.render("MultiplayerParty", {
			id: id,
			size: MultiplayerPartys[String(id)].size,
			speed: MultiplayerPartys[String(id)].speed,
			gamenum: game,
		});
	});

	router.post(`/${id}/update`, (req: any, res: any) => {
		MultiplayerPartys[String(id)].changedirection(Number(req.body.game), Number(req.body.keypress));
		res.send("gut");
	});

	router.post(`/${id}/getFeld`, (req: any, res: any) => {
		res.send([
			MultiplayerPartys[`${id}`].Feld,
			MultiplayerPartys[`${id}`].position_apples,
			MultiplayerPartys[`${id}`].Players[req.body.game].x,
			MultiplayerPartys[`${id}`].Players[req.body.game].y,
		]);
	});

	res.send(`ihre Url ist \n localhost:1111/Multiplayer/${id}`);
});

module.exports = router;
