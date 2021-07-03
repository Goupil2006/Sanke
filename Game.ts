interface pos {
	[index: string]: number;
}

class Template {
	size: number;
	Feld: any;
	direction: number;
	lenght: number;
	position: pos;
	position_apple: pos;
	dead: boolean;
	constructor(size: number) {
		this.size = size;
		this.Feld = [];
		for (let i = 0; i < size; i++) {
			let Temp = [];
			for (let j = 0; j < size; j++) {
				Temp.push(0);
			}
			this.Feld.push(Temp);
		}
		this.direction = 2;
		this.lenght = 2;
		this.position = { x: Math.round(size / 2), y: Math.round(size / 2) };
		this.position_apple = this.getnewApplepos();
		this.dead = false;
	}

	getnewApplepos(): pos {
		let SuggestApplePos = { x: Math.round(Math.random() * (this.size - 1) + 1), y: Math.round(Math.random() * (this.size - 1) + 1) };
		if (this.Feld[SuggestApplePos.y - 1][SuggestApplePos.x - 1] == 0) {
			return SuggestApplePos;
		} else {
			return this.getnewApplepos();
		}
	}

	update = (direction2: number): void => {
		let direction = Number(direction2);
		if (direction != 0 && this.dead != true) {
			if (direction !== this.direction) {
				if (direction !== 3 && this.direction === 1) {
					this.direction = direction;
				}
				if (direction !== 4 && this.direction === 2) {
					this.direction = direction;
				}
				if (direction !== 1 && this.direction === 3) {
					this.direction = direction;
				}
				if (direction !== 2 && this.direction === 4) {
					this.direction = direction;
				}
			}
			switch (this.direction) {
				case 1:
					this.position = { x: this.position.x, y: this.position.y + 1 };
					break;
				case 2:
					this.position = { x: this.position.x + 1, y: this.position.y };
					break;
				case 3:
					this.position = { x: this.position.x, y: this.position.y - 1 };
					break;
				case 4:
					this.position = { x: this.position.x - 1, y: this.position.y };
					break;
			}

			if (this.position.y) {
				if (this.position.x != undefined) {
					if (this.position.x === this.position_apple.x && this.position.y === this.position_apple.y) {
						this.lenght += 1;
						this.Feld[this.position.y - 1][this.position.x - 1] = this.lenght;
						this.position_apple = this.getnewApplepos();
						this.movesnake();
					}
				}
			} else {
				this.dead = true;
			}
			if (this.Feld[this.position.y - 1][this.position.x - 1] == 0) {
				if (
					this.position.y - 1 < this.size + 1 &&
					this.position.y - 1 > 0 - 1 &&
					this.position.x - 1 < this.size + 1 &&
					this.position.x - 1 > 0 - 1
				) {
					if (this.position.y) {
						if (this.position.x != undefined) {
							if (this.position.x === this.position_apple.x && this.position.y === this.position_apple.y) {
								this.lenght += 1;
								this.Feld[this.position.y - 1][this.position.x - 1] = this.lenght;
								this.position_apple = this.getnewApplepos();
								this.movesnake();
							} else {
								this.Feld[this.position.y - 1][this.position.x - 1] = this.lenght;
								this.movesnake();
							}
						}
					}
				} else {
					this.dead = true;
				}
			}
		}
	};

	movesnake = () => {
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				if (this.Feld[i][j] != 0) {
					this.Feld[i][j] -= 1;
				}
			}
		}
	};
}

module.exports = Template;
