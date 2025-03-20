import { useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '../../zustand/store';
import './TestPage.css'; 

function TestPage () {
  const [ testList, setTestList ] = useState( [] );
  const fetchEvent = useStore((state) => state.fetchEvent)
  const [ newTest, setNewTest ] = useState( { name:'', description:'', location:'', school: [] } ); 
  const [addSchool, setAddSchool] = useState("");

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

//   function addSchool() {
//     console.log( 'in addSchool');
//     axios.post( '/api/test', { school: [addSchools]}).then(function(response){
//       console.log(response.data);
//       fetchEvent();
//     }).catch( function( err ){
//       console.log( err );
//       alert( 'error creating new todo' );
//   })
// }

  const schoolNames = {
    0: "Elk Rivers High School",
    1: "Rodgers High School",
    2: "Prairieview High School",
    3: "Zimmerman High School",
    4: "Otsego High School"
  };

  return (
    <div>
      <input type="text" placeholder='Name' onChange={ (e)=>{ setNewTest( {...newTest, name: e.target.value } ) } } />
      <input type="text" placeholder='Description' onChange={ (e)=>{ setNewTest( {...newTest, description: e.target.value } ) } } />
      <input type="text" placeholder='Location' onChange={ (e)=>{ setNewTest( {...newTest, location: e.target.value } ) } } />
      <input type="text" placeholder='Add School' onChange={(e)=> setAddSchool(e.target.value)}/>
      <button onClick={addSchool}>Add School</button>
      <form>
      <label for="school">Choose a school</label>
      <select id="school" multiple onChange={ (e)=>{ setNewTest ({ ...newTest, school: Array.from( e.target.selectedOptions, option => Number(option.value))})}}>
        {Object.entries(schoolNames).map(([id, school]) =>(
          <option key={id} value={id}>
            {school}
          </option>
        ))}
      </select>
      </form>
      <button onClick={ createNewTest }>Create</button>
      <h2>Test List</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Location</th>
              <th>School</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {
              testList.map(( item ) => (
                <tr key={item.id}>
                  <td><p>{item.name}</p></td>
                  <td><p>{item.description}</p></td>
                  <td><p>{item.location}</p></td>
                  <td>
                  {item.school?.map((schoolId) => (
                  <p key={schoolId}>{schoolNames[schoolId] || 'Unknown School'}</p>)) || <p>No school assigned</p>}</td>
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

// Simple form of dropdown select 1
// <form>
// <label for="school">Choose a school</label>
// <select id="school" multiple onChange={ (e)=>{ setNewTest( {...newTest, school: Number( e.target.value ) } ) } }>
//         <option value="0">Elk River High School</option>
//         <option value="1">Rodgers High School</option>
//         <option value="2">Praireview High School</option>
//         <option value="3">Zimmeran High School</option>
//         <option value="4">Otsegol High School</option>
// </select>
// </form>
// For testList.map <td><p></p></td>
// <td><p>{schoolNames[item.school] || "Unknown School"}</p></td> 