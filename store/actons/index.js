export {viewTrains} from './trains'

// import { createStore } from 'redux'

// /**
//  * This is a reducer, a pure function with (state, action) => state signature.
//  * It describes how an action transforms the state into the next state.
//  *
//  * The shape of the state is up to you: it can be a primitive, an array, an object,
//  * or even an Immutable.js data structure. The only important part is that you should
//  * not mutate the state object, but return a new object if the state changes.
//  *
//  * In this example, we use a `switch` statement and strings, but you can use a helper that
//  * follows a different convention (such as function maps) if it makes sense for your
//  * project.
//  */



// const INITIAL_STATE ={
//     inputt:['Train 1', 'Train 2', 'Train 3'],
    
//     selectedTrain : null,
//     trains : [
//       {name:'Udaya devi',time:'8:00',stat:'Running',key:1},
//       {name:'Badulu Kumari',time:'9:00',stat:'Not Running',key:2},
//       {name:'Ruhunu Kumari',time:'10:00',stat:'Running', key:3}
//     ],
//     inp :false,
//     number:0
//   }; 



// const reducer = (state = INITIAL_STATE, action)=> {
//   switch (action.type) {
//     case 'INCREMENT':
//         return state.number + 1
//     // case 'DECREMENT':
//     //     return state - 1
//     default:
//         return state
//   }
// }



// export default reducer;