import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import {
    MobileOnlyView,
} from "react-device-detect";
import Checkbox from './Checkbox';
import RouteInfo from './RouteInfo'
import esebusLogo from '../Assets/eseBus_app_icon.svg'
import esebusText from '../Assets/eseBus_text.png'
import SearchBar from './SearchBar'
function Sidebar(props){
    return(
        <Menu {...props} className="min-h-screen flex flex-col">
				<div className="bm-item-list">
					<div className="flex-grow">
						<div>
							<div className="flex flex-wrap items-stretch">
								<img src={esebusLogo} class="h-10 mr-3 shadow-lg rounded-full mt-2"/>
								<img src={esebusText} class="h-7 mt-3 object-center"/> <span className="pt-2 text-gray-400"><sup>beta</sup></span>
							</div>
							<div className="w-full border border-esebus-dark mt-5 shadow-md">
								<div className="mx-5 py-4">
									<h3 className="text-esebus-dark font-bold">Seleccione una ruta</h3>
									<div>
										<SearchBar onSearch={props.onSearch} value={props.searchFilter}/>
									</div>
									<ul className="flex-grow overflow-y-auto scrolling-touch">
										{(!props.searchFilter)?
											<li className="pt-5">
												<Checkbox  label="Show All" handleCheck={props.handleAllCheck} value={props.checkAll}/>
											</li>
										:""}
										{props.filteredRoutes.map((ruta, index) => (
											<div className="pt-2">
											<li key={index}>
												<Checkbox label={ruta.nombreRuta} handleCheck={props.handleCheck} index={index} value={ruta.shown}/>
											</li>
											</div>
										))}
									</ul>
								</div>
							</div>
						</div>
                        <MobileOnlyView>
							{
								(props.routes.some(r=>r.shown)) ? 
									<div className="flex mt-5 text-gray-600">
										<p>Leyenda</p>
									</div>
								: ""
							}
						<div className="overflow-y-auto scrolling-touch h-1/4 sm:h-full mt-5 sm:mb-3 rep">
							<RouteInfo routes={props.routes.filter(route=>route.shown)}/>
						</div>
                        </MobileOnlyView>
					</div>
				</div>
        </Menu>
    )
}

export default Sidebar;