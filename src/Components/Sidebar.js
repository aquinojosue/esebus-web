import React,{useEffect, useRef} from 'react';
import {slide as Menu} from 'react-burger-menu';
import { MobileOnlyView } from 'react-device-detect';
import Checkbox from './Checkbox';
import RouteInfo from './RouteInfo'
import esebusLogo from '../Assets/eseBus_app_icon.svg'
import esebusText from '../Assets/eseBus_text.png'
import SearchBar from './SearchBar'

function Sidebar(props){
    function onlyUnique(value, index, self){
        return self.indexOf(value) === index;
    }
    const myRef = useRef(null)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return(
        <Menu {...props}>
            <div className="static">
                <div className="absolute bg-white top-0">
                    <div className="flex items-stretch pt-8 ">
                        <img src={esebusLogo} className="h-10 mr-1 shadow-lg rounded-full mt-2"/>
                        <img src={esebusText} className="h-7 mt-3"/> {/**<span className="pt-2 text-gray-400"><sup>beta</sup></span> */}
                    </div>
                    <div className="pt-2">
                        <h3 className="text-esebus-dark font-bold text-center">Seleccione una ruta </h3>
                        <div>
                            <SearchBar onSearch={props.onSearch} value={props.searchFilter}/>
                        </div>
                    </div>
                </div>
                
                <div className="mx-5 pt-28 pb-8">
                    <ul className="h-full flex-grow overflow-y-auto scrolling-touch">
                        {(!props.searchFilter)?
                            <li className="pt-5" ref={myRef}>
                                <Checkbox label="Show All" handleCheck={props.handleAllCheck} value={props.checkAll}/>
                            </li>
                        :<div className="pt-3"></div>}
                        
                        {props.filteredRoutes.map(a => a.departamento).filter(onlyUnique).map((depto, deptoIndex) => (
                            <div key={deptoIndex}>
                                <span>{depto}</span>
                                {props.filteredRoutes.filter(r=>r.departamento === depto).map((ruta, index,self)=>
                                    <div className="pt-2">
                                        <li key={index}>
                                        <Checkbox label={ruta.nombreRuta} handleCheck={props.handleCheck} parentElement={self} index={index} value={ruta.shown}/>
                                        </li>
                                    </div>
                                )}
                            </div>
                        ))}
                    </ul>
                </div>
                {/**<div className="absolute bg-white bottom-0 h-8 w-full">Amalgamo</div> */}
            </div>
        </Menu>
    )
}

export default Sidebar;