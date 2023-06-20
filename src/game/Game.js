const ROT = require('rot-js');

const Game = {
	display: null,
	map: {},
	init: function () {
		this.display = new ROT.Display();
		document.querySelector('.App').appendChild(this.display.getContainer());
		this._generateMap();
		return;
	},
	_generateMap: function () {
		let digger = new ROT.Map.Digger();
		let digCallback = function (x, y, value) {
			if (value) {
				return;
			}

			let key = `${x},${y}`;
			this.map[key] = '.';
		};
		digger.create(digCallback.bind(this));
		this._drawWholeMap();
	},
	_drawWholeMap: function () {
		for (let key in this.map) {
			let parts = key.split(',');
			let x = parseInt(parts[0]);
			let y = parseInt(parts[1]);
			this.display.draw(x, y, this.map[key]);
		}
	},
};

export default Game;
