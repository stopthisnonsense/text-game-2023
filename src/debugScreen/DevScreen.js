import Game from '../game/Game.js';
export default function DevScreen({ globals, player, map }) {
	return (
		<>
			<div>Globals {JSON.stringify(globals)}</div>
			<div class=''>Player: {JSON.stringify(player)}</div>
			<div>World: {JSON.stringify(map)}</div>
		</>
	);
}
