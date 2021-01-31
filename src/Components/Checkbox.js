import React, {useState} from 'react';

function Checkbox(props){
   function toggleChecked(){
        props.handleCheck(props.index);
    }
    return(
        <label className="flex justify-start items-start">
            <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                <input type="checkbox" className="opacity-0 absolute" checked={props.value} onClick={toggleChecked}/>
                <svg className="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
            </div>
            <div className="select-none">{props.label}</div>
        </label>
    )
}

export default Checkbox;