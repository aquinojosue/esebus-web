import React from 'react';
import RouteInfo from './RouteInfo'


function Card(props) {
    return (
        (props.routes.length > 0)?
            <div className="absolute hidden xl:block max-w-md w-full bottom-5 right-5 z-10">
                <div className=" bg-white rounded-xl p-4 flex flex-col h-48 shadow-2xl">
                    <div className="mb-8 ml-5">
                        
                        <div className=" overflow-auto h-40 ">
                            <div className="text-esebus-dark font-bold text-xl mb-2">
                            Leyenda
                        </div>
                            <RouteInfo routes={props.routes}/>
                        </div>
                    </div>
                </div>
            </div>
        :""
    );
}

export default Card;