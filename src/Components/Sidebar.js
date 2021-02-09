import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import { MobileOnlyView } from 'react-device-detect';
import Checkbox from './Checkbox';
import RouteInfo from './RouteInfo'
import esebusLogo from '../Assets/eseBus_app_icon.svg'
import esebusText from '../Assets/eseBus_text.png'
import SearchBar from './SearchBar'

function Sidebar(props){
    return(
        <Menu {...props} className="max-h-50">
				<div className="bm-item-list">
                    <div className=" h-60">
						<div>
							<div className="flex items-stretch">
								<img src={esebusLogo} class="h-10 mr-3 shadow-lg rounded-full mt-2"/>
								<img src={esebusText} class="h-7 mt-3 object-center"/> <span className="pt-2 text-gray-400"><sup>beta</sup></span>
							</div>
							<div className="flex flex-grow w-full mt-3">
								<div className="h-96 mx-5 py-4">
									<h3 className="text-esebus-dark font-bold">Seleccione una ruta</h3>
									<div>
										<SearchBar onSearch={props.onSearch} value={props.searchFilter}/>
									</div>
									<ul className="h-full flex-grow overflow-y-auto scrolling-touch">
										{(!props.searchFilter)?
											<li className="pt-5">
												<Checkbox label="Show All" handleCheck={props.handleAllCheck} value={props.checkAll}/>
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
					</div>
				</div>
        </Menu>
    )
}

export default Sidebar;