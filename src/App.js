import './styles.css';
import React, { useState, useEffect } from 'react';
import Mapa from './Components/Mapa';
import rutas from './Data/rutas.json';
import RouteInfo from './Components/RouteInfo'
import esebusLogo from './Assets/eseBus_app_icon.svg'
import Sidebar from './Components/Sidebar';
import { isBrowser } from "react-device-detect";
import Card from './Components/Card';

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
      isOpen: isBrowser
  }
	return (
            <div class="flex flex-col h-screen" id="page-wrap">
                <Sidebar {...sidebarParams} />
                {/**<div className="hidden xl:block absolute bottom-5 right-5 overflow-auto h-40 z-10">
                    <RouteInfo routes={routes.filter(route=>route.shown)}/>
                </div> */}
                <Card routes={routes.filter(r=>r.shown)}/>
                <main class="flex-1 overflow-y-auto" id="page-wrap">
                    <Mapa routes={routes}/>
                </main>
                {
                    routes.some(r=>r.shown)?
                        <footer class="xl:hidden py-10 bg-gray-700 text-center text-white">
                            <div className="overflow-auto h-28 px-5">
                                <RouteInfo routes={routes.filter(route=>route.shown)}/>
                            </div>
                        </footer>:""
                }
    </div>
	);
}
