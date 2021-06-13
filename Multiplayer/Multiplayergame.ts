interface pos {
	[index: string]: number;
}
interface Player {
	[index: string]: number;
}
class MultiplayerTemplate {
	size: number;
	Feld: any;
	Players: any[];
	position_apples: pos[];
	constructor(size: number) {
		this.size = size;
		this.Feld = [];
		this.Players = [];
		for (let i = 0; i < size; i++) {
			let Temp = [];
			for (let j = 0; j < size; j++) {
				Temp.push({
					val: 0,
					Player: null,
				});
			}
			this.Feld.push(Temp);
		}
		this.position_apples = [];
		for (let i = 0; i < this.size / 5; i++) {
			this.position_apples.push(this.getnewApplepos());
		}
		setInterval(this.update, 100);
	}

	newPlayer = (): number => {
		this.Players.push({
			isdead: false,
			dirupdated: false,
			direction: 2,
			length: 2,
			x: Math.round(this.size / 2),
			y: Math.round(this.size / 2),
		});
		console.log("newPlayer");
		return this.Players.length - 1;
	};

	changedirection = (Player: number, direction: number): void => {
		let dirationPlayer = this.Players[Player].direction;
		if (direction !== dirationPlayer && this.Players[Player].dirupdated == false) {
			if (direction !== 3 && dirationPlayer === 1) {
				this.Players[Player].direction = direction;
				this.Players[Player].dirupdated = true;
			}
			if (direction !== 4 && dirationPlayer === 2) {
				this.Players[Player].direction = direction;
				this.Players[Player].dirupdated = true;
			}
			if (direction !== 1 && dirationPlayer === 3) {
				this.Players[Player].direction = direction;
				this.Players[Player].dirupdated = true;
			}
			if (direction !== 2 && dirationPlayer === 4) {
				this.Players[Player].direction = direction;
				this.Players[Player].dirupdated = true;
			}
		}
	};

	getnewApplepos = (): pos => {
		let SuggestApplePos = {
			x: Math.round(Math.random() * (this.size - 1)),
			y: Math.round(Math.random() * (this.size - 1)),
		};
		let isPosOk = true;
		for (let i = 0; i < this.position_apples.length; i++) {
			if (this.position_apples[i].x == SuggestApplePos.x && this.position_apples[i].y == SuggestApplePos.y) {
				isPosOk = false;
			}
		}
		if (this.Feld[SuggestApplePos.y][SuggestApplePos.x].val == 0 && isPosOk) {
			return SuggestApplePos;
		} else {
			return this.getnewApplepos();
		}
	};

	killPlayer = (index: number) => {
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				if (this.Feld[i][j].Player === index) {
					this.Feld[i][j].Player = null;
					this.Feld[i][j].val = 0;
				}
			}
		}
	};

	update = (): void => {
		for (let i = 0; i < this.Players.length; i++) {
			const currPlayer = this.Players[i];
			currPlayer.dirupdated = false;
			if (!currPlayer.isdead) {
				switch (currPlayer.direction) {
					case 1:
						currPlayer.y = currPlayer.y + 1;
						break;
					case 2:
						currPlayer.x = currPlayer.x + 1;
						break;
					case 3:
						currPlayer.y = currPlayer.y - 1;
						break;
					case 4:
						currPlayer.x = currPlayer.x - 1;
						break;
				}

				//check if player ist outside the Field

				if (currPlayer.x >= this.size || currPlayer.x < 0 || currPlayer.y >= this.size || currPlayer.y < 0) {
					currPlayer.isdead = true;
					this.killPlayer(i);
					break;
				}

				let isPosSame = false;

				for (let j = 0; j < this.position_apples.length; j++) {
					if (currPlayer.x == this.position_apples[j].x && currPlayer.y == this.position_apples[j].y) {
						isPosSame = true;
						this.position_apples[j] = this.getnewApplepos();
					}
				}

				if (isPosSame) {
					currPlayer.length += 1;
				}
				this.movesmake();
				if (this.Feld[currPlayer.y][currPlayer.x].Player != null) {
					currPlayer.isdead = true;
					this.killPlayer(i);
					break;
				}
				this.Feld[currPlayer.y][currPlayer.x] = {
					val: currPlayer.length,
					Player: i,
				};
			}
		}
	};

	movesmake = () => {
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				if (this.Feld[i][j].val != 0) {
					this.Feld[i][j].val -= 1;
				} else {
					this.Feld[i][j].Player = null;
				}
			}
		}
	};
}

module.exports = MultiplayerTemplate;
