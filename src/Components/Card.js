import React from 'react';
import RouteInfo from './RouteInfo'
function Card(props) {
    return (
            <div className="absolute hidden xl:block h-50 max-w-md w-full lg:flex bottom-0 z-10 pl-5 pb-5">
                <div className="border-r bg-esebus-dark border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                    <div className="text-white font-bold text-xl mb-2">Leyenda</div>
                        <div className=" overflow-auto h-28 ">
                            <RouteInfo routes={props.routes}/>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Card;