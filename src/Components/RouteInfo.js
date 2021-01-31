import React from 'react'

function RouteInfo(props){
    return(
        <div className="leaflet-control overflow-y-auto scrolling-touch w-full">
            {
                props.routes.map((route, index)=>{
                    return(
                        (route.shown)?
                        <React.Fragment key={index}>
                            <div class="h-auto w-full border border-gray-500 p-5 rounded-md mb-2">
                                <div class="row-span-3"><h1 className="text-gray-700 font-bold text-lg">{route.nombreRuta}</h1></div>
                                <div class="col-span-2">Ida <hr style={{"height":"5px", "background":route.colorIda}}/></div>
                                <div class="row-span-2 col-span-2">Vuelta <hr style={{"height":"5px", "background":route.colorVuelta}}/></div>
                            </div>
                        </React.Fragment>:""
                    )
                })
            }
        </div>
    );
}

export default RouteInfo;