import React from 'react'
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
function RouteInfo(props){
    return(
        <div className="leaflet-control overflow-y-auto scrolling-touch w-full">
            <TransitionGroup>
            {
                props.routes.map((route, index)=>{
                    return(
                        <CSSTransition timeout={(index + 1)*300} classNames="item">
                                <div class="h-25 bg-white w-full border border-gray-500 p-3 mb-2 shadow-lg" key={index}>
                                    <div><h1 className="text-gray-700 font-bold text-lg">{route.nombreRuta}</h1></div>
                                    <div>Ida <hr style={{"height":"5px", "background":route.colorIda}}/></div>
                                    <div>Vuelta <hr style={{"height":"5px", "background":route.colorVuelta}}/></div>
                                </div>
                        </CSSTransition>
                    )
                })
            }
            </TransitionGroup>
            
        </div>
    );
}

export default RouteInfo;