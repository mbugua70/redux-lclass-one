// Three core concepts in Redux.
// 1. A store that holds the state of your application.
// 2. An action that describes the changes in the state of the application.
// 3. A reducer that carries out the state transition depending on the action.


// Actions
// Carry some information from your app to the redux store.
// Actions are plain javascript object.
// action have a 'type' property that indicates the type of action being performed.
// type is usually defined as a string constant

// action creator is function that return an action.

// Reducers
// specify how the app's state changes in response to actions sent to the store.
// its a function that accept state and action as arguements, and returns the next state of the application.
// example (previousState, action) => newState

// importing now redux to our application.

 const redux = require('redux');
 const reduxLogger = require('redux-logger')
 const createStore = redux.createStore

 const combineReducers = redux.combineReducers
 const logger  = reduxLogger.createLogger();
 const applyMiddleWare = redux.applyMiddleware


const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

function ReducerFun (){
    return{
        type: BUY_CAKE,
    }
}

function buyIcecream (){
    return{
        type: BUY_ICECREAM,
    }
}

// our initialState example

// const initialState = {
//     numStore: 20,
//     numIceCream: 21
// }
const initialStateCake = {
    numStore: 20,
}

const initialStateCream = {
    numIceCream: 60,
}

// reducer function two
// takes two arguements action, state
// note: for the entire application we will only have one store.
const ReducerOneCake = (state = initialStateCake, action) =>{
  switch(action.type){
    case BUY_CAKE:
        return {
            numStore: state.numStore + 1
        };

        default:
        return state;
  }
}
const ReducerOneCream = (state = initialStateCream, action) =>{
  switch(action.type){
    case BUY_ICECREAM:
        return {
           numIceCream: state.numIceCream + 3
        };

        default:
        return state;
  }
}

// Redux Store
// One store for the entire application
// responsibilities
// hold application state
// allows access to state via getState();
// provides a method called dispatch to allow any update to the application dispatch(action);
// Registers listeners via subscribe(listener)
// handles unregistering of listeners via the function returned by the subscribe

// holding the application state
const rootReducer = combineReducers({
    cake: ReducerOneCake,
    icream: ReducerOneCream
})
const store = createStore(rootReducer,applyMiddleWare(logger))
console.log('initial state', store.getState());

// Registers listeners via subscribe method
// we will use subscribe() which usually take callback function as an arguement.

store.subscribe(() => {})

// update of state
//  we use dispatch()  method for passing of an action

store.dispatch(ReducerFun())
store.dispatch(ReducerFun())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())

// middleware
// is the suggested way to extend Redux with custom functionality
// Provides a third  party extension point between dispatching an action and the moment it reaches the reducer

// we use middleware for logging, crash reporting, performing asynchronous task