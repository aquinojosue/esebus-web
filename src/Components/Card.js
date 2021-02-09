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
                <div className="absolute hidden xl:block max-w-md bottom-5 right-5 z-10 content-center">
                    <div className=" bg-white rounded-xl pt-3 pl-3 flex flex-col h-24 w-60 shadow-2xl">
                        <div className="mb-8">
                            <div className=" overflow-auto h-20 overflow-y-scroll">
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