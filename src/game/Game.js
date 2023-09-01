import Player from './player';
const ROT = require('rot-js');

function init() {
	return function () {
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
	};
}

function keyCheck(e) {
	e.preventDefault();
	Game._drawWholeMap();

	switch (e.key) {
		case 'ArrowUp':
			for (let key in Game.map) {
				let parts = key.split(',');
				let x = parseInt(parts[0]);
				let y = parseInt(parts[1]);
				if (x === Game.player.x && y === Game.player.y - 1) {
					Game.player.y -= 1;
					break;
				}
			}
			break;
		case 'ArrowLeft':
			for (let key in Game.map) {
				let parts = key.split(',');
				let x = parseInt(parts[0]);
				let y = parseInt(parts[1]);
				if (x === Game.player.x - 1 && y === Game.player.y) {
					Game.player.x -= 1;
					break;
				}
			}
			break;
		case 'ArrowRight':
			for (let key in Game.map) {
				let parts = key.split(',');
				let x = parseInt(parts[0]);
				let y = parseInt(parts[1]);
				if (x === Game.player.x + 1 && y === Game.player.y) {
					Game.player.x += 1;
					break;
				}
			}
			break;

		case 'ArrowDown':
			for (let key in Game.map) {
				let parts = key.split(',');
				let x = parseInt(parts[0]);
				let y = parseInt(parts[1]);
				if (x === Game.player.x && y === Game.player.y + 1) {
					Game.player.y += 1;
					break;
				}
			}
			break;
		default:
			break;
	}
	if (Game.map[`${Game.player.x},${Game.player.y}`] === '>') {
		console.log(`${Game.player.name} at stairs`);
		Game.globals.floor = Game.globals.floor + 1;
		Game.resetGame();
	}
	console.log(Game.map[`${Game.player.x},${Game.player.y}`]);
	Game.display.draw(Game.player.x, Game.player.y, `@`, `#0f0`);
}
const resetGame = function () {
	this.map = {};
	this.init();
	this.globals.timesReset = this.globals.timesReset + 1;
	this.player.name = `The Player of Reset ${this.globals.timesReset}, Floor ${Game.globals.floor}`;
};

const generatePlayer = function () {
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
};
const Game = {
	display: null,
	globals: {
		devMode: false,
		timesReset: 0,
		floor: 1,
	},
	player: Player,
	map: {},
	devMode: function () {
		console.log(`Dev Mode Enabled: ${this.globals.devMode}`);
		if (this.globals.devMode === false) {
			console.log('Dev Mode Started');
			this.globals.devMode = true;
			return this.resetGame();
		}
	},
	init: init(),
	_keyCheck: keyCheck,
	_generatePlayer: generatePlayer,
	resetGame: resetGame,
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
		// Pull the last tile from the map object
		let lastTile = Object.keys(Game.map)[Object.keys(Game.map).length - 1];
		// Set the last tile to be stairs
		Game.map[lastTile] = '>';
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
