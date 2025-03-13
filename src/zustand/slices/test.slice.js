import axios from 'axios';

const  createTestSlice = ( ( set )=>({
  event: [],
  fetchEvent: function(){
      axios.get( '/api/test' ).then( function( response ){
          console.log( 'fetched from GET event:', response.data );
          set( ( state )=>( { event: response.data } ) )
      }).catch( function( err ){
          console.log( err );
          alert( 'error getting event from server' );
      });
  }
}));

// const useStore = create( ( set )=>({
//   todos: [],
//   setTodos: ( newTodos )=>{
//       set( (state)=>( { todos: newTodos } ) )
//   },
//   getTodos: ()=>{
//       axios.get( '/api/todo' ).then( function( response ){
//           console.log( 'back from GET:', response.data );
//           set( ( state )=>( {todos: response.data } ))
//       }).catch( function( err ){
//           console.log( err );
//           alert( 'error getting todos from server' );
//       })        
//   }
// }))

export default createTestSlice;
