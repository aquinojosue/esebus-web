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
                                <div class="h-auto w-full border border-gray-500 p-5 mb-2 shadow-md" key={index}>
                                    <div class="row-span-3"><h1 className="text-gray-700 font-bold text-lg">{route.nombreRuta}</h1></div>
                                    <div class="col-span-2">Ida <hr style={{"height":"5px", "background":route.colorIda}}/></div>
                                    <div class="row-span-2 col-span-2">Vuelta <hr style={{"height":"5px", "background":route.colorVuelta}}/></div>
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