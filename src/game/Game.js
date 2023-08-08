const ROT = require('rot-js');

const Game = {
	display: null,
	globals: {
		devMode: false,
		timesReset: 0,
	},
	player: {
		name: 'The Player',
	},
	map: {},
	devMode: function () {
		console.log(`Dev Mode Enabled: ${this.globals.devMode}`);
		if (this.globals.devMode === false) {
			console.log('Dev Mode Started');
			this.globals.devMode = true;
		}
	},
	init: function () {
		this.display = new ROT.Display();
		if (document.querySelector('.App canvas')) {
			document.querySelector('.App canvas').remove();
		}
		document.querySelector('.App').appendChild(this.display.getContainer());
		this._generateMap();

		return;
	},
	resetGame: function () {
		this.map = {};
		this.init();
		this.globals.timesReset = this.globals.timesReset + 1;
		this.player.name = `The Player of Reset ${this.globals.timesReset}`;
		console.log(this, this.map.toString());
	},
	_generateMap: function () {
		let digger = new ROT.Map.Digger();
		let digCallback = function (x, y, value) {
			if (value) {
				return;
			}

			let key = `${x},${y}`;
			if (x % 2 == 0) {
				this.map[key] = ',';
			} else if (x % 13 == 0 && y % 13 == 0) {
				this.map[key] = '^';
			} else {
				this.map[key] = '.';
			}
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
