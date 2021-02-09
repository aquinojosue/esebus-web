import React from 'react';
import RouteInfo from './RouteInfo'


function FooterLegend(props){
    return(
        (props.routes.length > 0)?
            <footer class="xl:hidden pt-2 pb-3 bg-gray-700 text-center text-white">
                <div className="text-white font-bold text-md mb-2">
                    Leyenda
                </div>
                <div className="overflow-auto h-28 pl-5">
                    <RouteInfo routes={props.routes.filter(route=>route.shown)}/>
                </div>
            </footer>
        :""
    )
}
export default FooterLegend;