const ROT = require('rot-js');

const Game = {
	display: null,
	globals: {
		devMode: false,
		timesReset: 0,
	},
	player: {
		name: 'The Player',
		x: null,
		y: null,
	},
	map: {},
	devMode: function () {
		console.log(`Dev Mode Enabled: ${this.globals.devMode}`);
		if (this.globals.devMode === false) {
			console.log('Dev Mode Started');
			this.globals.devMode = true;
			return this.resetGame();
		}
	},
	init: function () {
		this.display = new ROT.Display();
		if (document.querySelector('.App canvas')) {
			document.querySelector('.App canvas').remove();
		}
		document.querySelector('.App').appendChild(this.display.getContainer());
		this._generateMap();
		this._generatePlayer();
		window.removeEventListener('keydown', this._keyCheck);
		window.addEventListener('keydown', this._keyCheck);
		return;
	},
	_keyCheck: function (e) {
		e.preventDefault();
		Game._drawWholeMap();
		switch (e.key) {
			case 'ArrowUp':
				Game.player.y -= 1;
				break;
			case 'ArrowLeft':
				Game.player.x -= 1;
				break;
			case 'ArrowRight':
				Game.player.x += 1;
				break;
			case 'ArrowDown':
				Game.player.y += 1;
				break;
			default:
				break;
		}
		Game.display.draw(Game.player.x, Game.player.y, `@`, `#0f0`);
	},
	_generatePlayer: function () {
		for (let key in this.map) {
			let parts = key.split(',');
			let x = parseInt(parts[0]);
			let y = parseInt(parts[1]);

			this.player.x = x;
			this.player.y = y;
			this.display.drawOver(this.player.x, this.player.y, `@`, `#0f0`);
			break;
		}
		return;
	},
	resetGame: function () {
		this.map = {};
		this.init();
		this.globals.timesReset = this.globals.timesReset + 1;
		this.player.name = `The Player of Reset ${this.globals.timesReset}`;
		// console.log(this, this.map.toString());
	},
	_generateMap: function () {
		let digger = new ROT.Map.Digger();
		let digCallback = function (x, y, value) {
			if (value) {
				return;
			}

			let key = `${x},${y}`;
			if (x % 2 === 0) {
				this.map[key] = ',';
			} else if (x % 13 === 0 && y % 13 === 0) {
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
