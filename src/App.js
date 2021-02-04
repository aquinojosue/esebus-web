import './styles.css';
import React, {useState, useEffect} from 'react';
import Mapa from './Components/Mapa';
import rutas from './Data/rutas.json';
import Checkbox from './Components/Checkbox';
import RouteInfo from './Components/RouteInfo'
import esebusLogo from './Assets/eseBus_app_icon.svg'
import esebusText from './Assets/eseBus_text.png'
import SearchBar from './Components/SearchBar'
import Sidebar from './Components/Sidebar';
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile
  } from "react-device-detect";
//import { CSSTransitionGroup } from 'react-transition-group';

export default function App() {
  const [routes, setRoutes] = useState([...rutas]);
  const [filteredRoutes, setFilteredRoutes] = useState([...rutas]);
  const [checkAll, setCheckAll] = useState(false);
  const [searchFilter, setFilter] = useState('');
  function handleCheck(index){
	const newRoutes = [...routes];
	const newFilteredRoutes = [...filteredRoutes];
	const item = {...newFilteredRoutes[index]}

	const originalIndex = newRoutes.findIndex((element)=>(element.nombreRuta===item.nombreRuta))
	item.shown = !item.shown;
	newFilteredRoutes[index] = item;
	setFilteredRoutes(newFilteredRoutes);

	if(originalIndex!=-1){
		newRoutes[originalIndex] = item;
		setRoutes(newRoutes);
	}
  }
  function handleAllCheck(){
	const newState = !checkAll;
	const newRoutes = [...routes].map((ruta)=>{
		ruta.shown = newState;
		return ruta;
	});
	setRoutes(newRoutes)
	setCheckAll(newState);
  }
  function onSearch(searchValue){
	  setFilter(searchValue);
  }

  useEffect(()=>{
	let timerId = null;
	if(searchFilter){
		timerId = setTimeout(async()=>{
			const newFilteredRoutes = routes.filter(route=> route.nombreRuta.toLowerCase().includes(searchFilter.toLowerCase()));
			setFilteredRoutes(newFilteredRoutes);
		})
	}else {
		setFilteredRoutes([...routes]);	
	}
	return()=>{
		clearTimeout(timerId);
	}
  },[searchFilter])
  
  const sidebarParams = {
	  pageWrapId: "page-wrap",
	  outerContainerId: "App",
	  customBurgerIcon: <img src={esebusLogo}/>,
	  onSearch: onSearch,
	  searchFilter: searchFilter,
	  handleAllCheck: handleAllCheck,
	  checkAll: checkAll,
	  filteredRoutes: filteredRoutes,
	  handleCheck: handleCheck,
	  routes: routes,

  }
	return (
		<div className="flex flex-wrap" id="App">
		<Sidebar {...sidebarParams}/>
		{
			/*
			<div className="flex flex-wrap px-3 sm:px-0 sm:grid sm:grid-cols-4 debug-screens">
			<BrowserView>
				<div className="w-full sm:w-auto sm:col-span-2 lg:col-span-1 h-auto sm:mx-8">
					<div className="flex flex-col h-auto sm:h-screen">
						<div classname="pt-3">
							<div className="flex flex-wrap pt-3 items-stretch">
								<img src={esebusLogo} class="h-10 mr-3 shadow-lg rounded-full mt-2"/>
								<img src={esebusText} class="h-7 mt-3 object-center"/> <span className="pt-2 text-gray-400"><sup>beta</sup></span>
							</div>
							<div className="h-auto w-full border border-esebus-dark mt-5 shadow-md">
								<div className="mx-5 py-5">
									<h3 className="text-esebus-dark font-bold">Seleccione una ruta</h3>
									<div>
										<SearchBar onSearch={onSearch} value={searchFilter}/>
									</div>
									<ul className="md:max-h-52 overflow-y-auto scrolling-touch">
										{(!searchFilter)?
											<li className="pt-5">
												<Checkbox  label="Show All" handleCheck={handleAllCheck} value={checkAll}/>
											</li>
										:""}
										{filteredRoutes.map((ruta, index) => (
											<div className="pt-2">
											<li key={index}>
												<Checkbox label={ruta.nombreRuta} handleCheck={handleCheck} index={index} value={ruta.shown}/>
											</li>
											</div>
										))}
									</ul>
								</div>
							</div>
						</div>
							{
								(routes.some(r=>r.shown)) ? 
									<div className="flex mt-5 text-gray-600">
										<p>Leyenda</p>
									</div>
								: ""
							}
						<div className="overflow-y-auto scrolling-touch h-auto sm:h-full mt-5 sm:mb-3 rep">
							<RouteInfo routes={routes.filter(route=>route.shown)}/>
						</div>
					</div>
				</div>
			</BrowserView>
			<main className="w-full sm:w-auto sm:col-span-2 lg:col-span-3 h-screen">*/
		}
			<main id="page-wrap" className="flex-grow w-screen h-full absolute">
				<Mapa routes={routes.filter(route=>route.shown)}/>
			</main>
			<div class="bg-blue-500">footer</div>
		</div>

		
	);
}
