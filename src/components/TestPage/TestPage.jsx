import { useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '../../zustand/store';
import './TestPage.css'; 

function TestPage () {
  const [ testList, setTestList ] = useState( [] );
  const fetchEvent = useStore((state) => state.fetchEvent)
  const [ newTest, setNewTest ] = useState( { name:'', zip:'', location: 0 } ); 

  useEffect(() => {
    fetchEvent()
    fetchTestList()
  }, [] );

  function fetchTestList(){
    console.log( 'in fetchTestList' );
    axios.get( '/api/test' ).then(function( response ){
      console.log( response.data )
      setTestList( response.data )
    }).catch( function( err ){
      console.log( err );
      alert( 'error getting test list' );
    })
  }


    function createNewTest () { 
      console.log( 'in createNewTest' );
      axios.post( '/api/test', newTest ).then( function( response ){
          console.log( response.data );
          fetchEvent();
      }).catch( function( err ){
          console.log( err );
          alert( 'error creating new todo' );
      })
  }

  const schoolNames = {
    0: "Elk Rivers High School",
    1: "Rodgers High School",
    2: "Prairieview High School",
    3: "Zimmerman High School",
    4: "Otsego High School"
  };

  return (
    <div>
      <input type="text" placeholder='name' onChange={ (e)=>{ setNewTest( {...newTest, name: e.target.value } ) } } />
      <input type="text" placeholder='zip' onChange={ (e)=>{ setNewTest( {...newTest, zip: e.target.value } ) } } />
      <select onChange={ (e)=>{ setNewTest( {...newTest, location: Number( e.target.value ) } ) } }>
                <option value="0">Elk River High School</option>
                <option value="1">Rodgers High School</option>
                <option value="2">Praireview High School</option>
                <option value="3">Zimmeran High School</option>
                <option value="4">Otsegol High School</option>
      </select>
      <button onClick={ createNewTest }>Create</button>
      <h2>Test List</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Zip</th>
              <th>Location</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {
              testList.map(( item ) => (
                <tr key={item.id}>
                  <td><p>{item.name}</p></td>
                  <td><p>{item.zip}</p></td>
                  <td><p>{schoolNames[item.location] || "Unknown School"}</p></td>
                  <td><p>{item.inserted}</p></td>
                </tr>
              ))
          }
          </tbody>
        </table>
    </div>
  );

}

export default TestPage