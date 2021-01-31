import './styles.css';
import React from 'react';
import Mapa from './Components/Mapa';
import rutas from './Data/rutas.json';
import Checkbox from './Components/Checkbox';

//https://stackoverflow.com/questions/60482018/make-a-sidebar-from-react-bootstrap
export default function App() {
	return (
		<div className="flex bg-gray-100">
			<aside className="bg-white w-64 min-h-screen flex flex-col">
				<span className="text-blue py-2">EseBus</span>
				<div className="border-r flex-grow">
					<h2>Rutas:</h2>
					<nav>
						<ul className="list-disc">
							{rutas.map((ruta, index) => (
								<li key={index}>
									<Checkbox label={ruta.nombreRuta} />
								</li>
							))}
						</ul>
					</nav>
				</div>
			</aside>
			<main className="flex-grow flex flex-col min-h-screen">
				<header className="bg-white border-b h-10 flex items-center justify-between">
					<h1>Home</h1>
				</header>
				<Mapa />
			</main>
		</div>
	);
}
