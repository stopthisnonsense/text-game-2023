export default function DevScreen({ game }) {
	return (
		<>
			<h2>Dev Console</h2>
			<div>Globals {JSON.stringify(game.globals)}</div>
			<div className=''>Player: {JSON.stringify(game.player)}</div>
			<div>World: {JSON.stringify(game.map)}</div>
		</>
	);
}
