import logo from './logo.svg';
import './App.css';
import Game from './game/Game.js';
import { useState } from 'react';

function App() {
	const [playerName, setPlayerName] = useState('');
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
					</div>
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
					onClick={() => {
						Game.devMode();
					}}
				>
					{' '}
					Enable DevMode
				</button>
			</div>
		</div>
	);
}

export default App;
