import {useState} from 'react';
import SearchItem from '../SearchItem/SearchItem';

function SearchList ( searchResults ) {
  
  return (
    <div>
      <h1>SearchList</h1>
      <>{ searchResults.searchResults.map( ( item, index )=>(
        <SearchItem key={ index } item={ item }/>
      )) }</>
    </div>
  );

}

export default SearchList