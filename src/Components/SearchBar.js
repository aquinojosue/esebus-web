import React from 'react'

function SearchBar(props){
    function setValue(value){
        props.onSearch(value);
    }
    return(
     <div class="pt-2 relative mx-auto text-gray-600">
        <input onChange={(e)=>setValue(e.target.value)} value={props.searchFilter} class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none shadow-md focus:border-esebus-dark w-full"
          type="search" name="search" placeholder="Search"/>
      </div>
    )
}

export default SearchBar;