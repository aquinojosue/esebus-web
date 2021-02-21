import React from 'react'
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
function RouteInfo(props){
    return(
            <TransitionGroup>
                {props.routes.map((route, index)=>
                    <CSSTransition timeout={(index + 1)*300} classNames="item">
                        <div class="bg-white border border-gray-500 p-1 mb-2 shadow-lg grid grid-rows-2 grid-flow-col items-center rounded-xl" key={index}>
                            <div className="row-span-2 w-32">
                                <h1 className="text-gray-700 text-center font-bold text-lg">{route.nombreRuta}</h1>
                            </div>
                            <div className="text-esebus-dark font-semibold">Ida <hr style={{"height":"5px", "background":route.colorIda}}/></div>
                            <div className="text-esebus-dark font-semibold">Vuelta <hr  style={{"height":"5px", "background":route.colorVuelta}}/></div>
                        </div>
                    </CSSTransition>
                )}
            </TransitionGroup> 
    );
}

export default RouteInfo;