import React from 'react';
import RouteInfo from './RouteInfo'
import {CSSTransition} from 'react-transition-group';

function Card(props) {
    return (
            <CSSTransition
                in={props.routes.length > 0}
                timeout={300}
                classNames="item"
                unmountOnExit
            >
                <div className="absolute hidden xl:block max-w-md bottom-5 right-5 z-10">
                    <div className=" bg-white rounded-xl p-4 flex flex-col h-32 w-72 shadow-2xl">
                        <div className="mb-8 ml-5">
                            <div className=" overflow-auto h-24 ">
                                {/**
                                <div className="text-esebus-dark font-bold text-xl mb-2">
                                    Leyenda
                                </div> */}
                                <RouteInfo className="" routes={props.routes}/>
                            </div>
                        </div>
                    </div>
                </div>
            </CSSTransition>
    );
}

export default Card;