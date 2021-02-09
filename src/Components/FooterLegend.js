import React from 'react';
import RouteInfo from './RouteInfo'
import {CSSTransition} from 'react-transition-group';

function FooterLegend(props){
    return(
        <CSSTransition
            in={props.routes.length > 0}
            timeout={300}
            classNames="item"
            unmountOnExit
        >
            <footer class="xl:hidden pt-2 pb-3 bg-gray-700 text-center text-white w-full">
                {/**<div className="text-white font-bold text-md mb-2">
                    Leyenda
                </div> */}
                <div className="overflow-auto h-20 mx-5 disable-scrollbars">
                    <RouteInfo routes={props.routes}/>
                </div>
            </footer>
        </CSSTransition>
        
    )
}
export default FooterLegend;