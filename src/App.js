import logo from './logo.svg';
import './App.css';
import Game from './game/Game.js';
import { useState, useEffect } from 'react';
import Devscreen from './debugScreen/DevScreen';

function App() {
	const [playerName, setPlayerName] = useState('');
	const [reset, resetGame] = useState(false);
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'
				>
					Learn React
				</a>
				<button
					onClick={() => {
						const header = document.querySelector('.App-header');
						if (header) {
							setTimeout(() => console.log('header found'), 1000);
							header.remove();
						}

						Game.init();
						setPlayerName(Game.player.name);
					}}
				>
					Start Game
				</button>
			</header>
			<div className='game'>
				<div>
					<h2>Command Console</h2>
					<div className='infobox'>
						<h3>{playerName}</h3>
						<div>
							<h4>h4:</h4>
							{Game.player.hp}/{Game.player.maxHp}
						</div>
					</div>
				</div>
				<div>
					{reset && (
						<Devscreen
							game={Game}
							globals={Game.globals}
							map={Game.map}
							player={Game.player}
						></Devscreen>
					)}
				</div>
				<button
					onClick={() => {
						Game.resetGame();
						setPlayerName(Game.player.name);
					}}
				>
					Reset Game
				</button>
				<button
					onClick={(e) => {
						Game.devMode();
						setPlayerName(Game.player.name);
						resetGame(Game.globals.devMode);
						e.target.remove();
					}}
				>
					Enable DevMode
				</button>
			</div>
		</div>
	);
}

export default App;
