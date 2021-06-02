class Template {
	Feld: any;
	constructor(sice: number) {
		this.Feld = [];
		for (let i = 0; i < sice; i++) {
			let Temp = [];
			for (let j = 0; j < sice; j++) {
				Temp.push(0);
			}
			this.Feld.push(Temp);
		}
		console.log(this.Feld);
	}
}

module.exports = Template;
