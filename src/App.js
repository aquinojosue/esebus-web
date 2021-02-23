import './styles.css';
import React, { useState, useEffect } from 'react';
import Mapa from './Components/Mapa';
import rutas from './Data/rutas.json';
import esebusLogo from './Assets/eseBus_app_icon.svg'
import Sidebar from './Components/Sidebar';
import Card from './Components/Card';
import FooterLegend from './Components/FooterLegend';
import useWindowDimensions from './Hooks/useWindowDimensions';

export default function App() {
  const [routes, setRoutes] = useState([...rutas]);
  const [filteredRoutes, setFilteredRoutes] = useState([...rutas]);
  const [checkAll, setCheckAll] = useState(false);
  const [searchFilter, setFilter] = useState('');
  function handleCheck(index, parentElement){
	const newRoutes = [...routes];
	const newFilteredRoutes = [...filteredRoutes];
	const item = {...parentElement[index]}

	const originalIndex = newRoutes.findIndex((element)=>(element.nombreRuta===item.nombreRuta))
	const filteredIndex = newFilteredRoutes.findIndex((element)=>(element.nombreRuta===item.nombreRuta))
	item.shown = !item.shown;
	newFilteredRoutes[filteredIndex] = item;
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

  useEffect(()=>{
      for(var i=0;i<3;i++){
		var random = Math.floor(Math.random()*(routes.length-1));
		routes[random].shown = true;
      }
  },[])
  
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
	isOpen: true
  }
  const { height, width } = useWindowDimensions();
	return (
        <div class="flex flex-col" style={{height: height}}>
            <Sidebar {...sidebarParams} />
            <Card routes={routes.filter(r=>r.shown)}/>
            <main class="flex-grow h-full" id="page-wrap">
                <Mapa routes={routes}/>
            </main>
            <FooterLegend routes={routes.filter(r=>r.shown)}/>
        </div>
	);
}
