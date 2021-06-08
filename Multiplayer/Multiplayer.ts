var express = require("express");
var router = express.Router();
var Multiplayergames = require("./Multiplayergame.ts");

var Multiplayergame = new Multiplayergames(20);

router.get("/", (req: any, res: any) => {
	let gamenum = Multiplayergame.newPlayer();
	res.render("multiplayer", { gamenum: gamenum });
});

router.post("/update", (req: any, res: any) => {
	Multiplayergame.changedirection(Number(req.body.game), Number(req.body.keypress));
	res.send("gut");
});

router.post("/getFeld", (req: any, res: any) => {
	res.send([Multiplayergame.Feld, Multiplayergame.position_apples]);
});

module.exports = router;
