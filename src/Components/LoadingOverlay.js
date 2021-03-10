import React from 'react';
import ReactLoading from 'react-loading';

function LoadingOverlay(props){
    return (
        props.loading ?
        <div class="w-full h-full fixed block top-0 left-0 bg-white opacity-75 loadingOverlay">
            <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{"top":"50%"}}>
                <ReactLoading type="spin" color="#005A80" height={100} width={100} />
            </span>
        </div>:""
    )
}
export default LoadingOverlay;