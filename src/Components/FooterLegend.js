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
            <footer class="xl:hidden pt-2 bg-gray-700 text-center text-white w-full footerdiv">
                <div className="overflow-auto h-20 mx-5 disable-scrollbars">
                    <RouteInfo routes={props.routes}/>
                </div>
            </footer>
        </CSSTransition>
        
    )
}
export default FooterLegend;