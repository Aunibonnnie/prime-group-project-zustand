import { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchPage.css'; 


function SearchPage () {
  const [ searchText, setSearchText] = useState( '' );
  const [ searchResults, setSearchResults ] = useState( [] );


  // Search for API event
  function searchNow(){
    console.log( 'in searchNow', searchText);
    const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=1yTx6aThy2loHkFPxsI2EgfMLCMtpGZR&q=${ searchText }t&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    axios.get( searchUrl ).then( function( response ) {
      console.log( 'back from GET:', response.data.data );
      setSearchResults( response.data.data );
    }).catch( function ( err ){
      console.log( err );
      alert( 'error with giphy search' );
    })
  }

  return (
    <div>
      <p><input type='text' placeholder='search'onChange={ (e)=>{setSearchText(e.target.value ) }} />
      <button onClick={ searchNow }>search</button></p>
        {searchResults.map((gif) => (
          <img key={item.id} src={gif.images.fixed_height.url} />
        ))}
    </div>
  );

}

export default SearchPage