import './styles.css';
import React, { useState, useEffect } from 'react';
import Mapa from './Components/Mapa';
import axios from 'axios';

import esebusLogo from './Assets/eseBus_app_icon.svg'
import Sidebar from './Components/Sidebar';
import Card from './Components/Card';
import FooterLegend from './Components/FooterLegend';
import useWindowDimensions from './Hooks/useWindowDimensions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
    const [results, setResults] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const [searchFilter, setFilter] = useState('');

    async function handleCheck(codigo){
        var index = results.findIndex(route=>route.codigoRuta === codigo);
        const newResult = {...results[index]};
        if(!newResult.shown && !newResult.colorIda){
            const {data} = await axios.get("https://elesteam.com/esebus/api/getRuta.php", {
                params: {
                    codigoRuta: codigo
                }
            });
            newResult = {...data[0]}
        }
        
        if(checkAll && newResult.shown) setCheckAll(false);
        newResult.shown = !newResult.shown;
        
        var newResults = [...results];
        newResults[index] = newResult;
        setResults(newResults);
    }

    useEffect(()=>{
        setCheckAll(results.filter(r=>r.shown).length === results.length)
    },[results])

    async function handleAllCheck(){
        const newState = !checkAll;
        if(newState && results.filter(r=>r.colorIda).length != results.length){
            await axios.get("https://elesteam.com/esebus/api/getRuta.php", {
                params: {
                    bulk: true
                }
            }).then(response=>{
                const newData = [...response.data].map((ruta)=>{
                    ruta.shown = newState;
                    return ruta;
                });
                setResults(newData);
            })
        }else{
            const newRoutes = [...results].map((ruta)=>{
                ruta.shown = newState;
                return ruta;
            });
            setResults(newRoutes)
        }
    }

    function onSearch(searchValue){
        setFilter(searchValue);
    }

    useEffect(() => {
        axios
            .get("https://elesteam.com/esebus/api/")
            .then(function (response) {
                setResults(response.data);
            })
    }, []);


    /*useEffect(()=>{
        for(var i=0;i<3;i++){
        var random = Math.floor(Math.random()*(routes.length-1));
        routes[random].shown = true;
        }
    },[])*/
    
    const sidebarParams = {
        pageWrapId: "page-wrap",
        outerContainerId: "App",
        customBurgerIcon: <img src={esebusLogo}/>,
        onSearch: onSearch,
        results: results,
        searchFilter: searchFilter,
        handleAllCheck: handleAllCheck,
        checkAll: checkAll,
        handleCheck: handleCheck,
        isOpen: true
    }

    const { height } = useWindowDimensions();

    return (
        <div class="flex flex-col" style={{height: height}}>
            <Sidebar {...sidebarParams} />
            <Card routes={results.filter(r=>r.shown)}/>
            <main class="flex-grow h-full" id="page-wrap">
            <ToastContainer />
                <Mapa routes={results}/>
            </main>
            <FooterLegend routes={results.filter(r=>r.shown)}/>
        </div>
    );
}
