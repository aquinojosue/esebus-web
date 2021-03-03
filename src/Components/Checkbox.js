import React from 'react';

function Checkbox(props){
   function toggleChecked(){
        props.handleCheck(props.codigo);
    }
    return(
        <label className="inline-flex items-center">
            <input type="checkbox" onChange={toggleChecked} className="form-checkbox h-5 w-5 text-indigo-600" checked={props.value}/>
            <span className="ml-2 text-gray-700">{props.label}</span>
        </label>
    )
}

export default Checkbox;