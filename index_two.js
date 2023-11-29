// Actions
// Synchronous Actions
// as soon as an action was dispatched, the state was immediately updated.


// async actions
// asynchronous api calls to fetch data from an end point and use that data in your application.
const redux = require('redux')
const createStore = redux.createStore
const applyMiddleWare = redux.applyMiddleware
const thunkMiddleWare = require('redux-thunk').default
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUserRequest = () =>{
    return{
        type: FETCH_USERS_REQUEST
    }
}

const fetchUserSuccess = (users) =>{
    return{
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}


const fetchUserFailure = (error) =>{
    return{
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const fetchUserReducers = (state = initialState, action) =>{
    switch(action.type){
     case  FETCH_USERS_REQUEST:
        return{
            ...state,
            loading: true,
        }

        case FETCH_USERS_SUCCESS:
            return{
                loading: false,
                users: action.payload,
                error: ''
            }

            case FETCH_USERS_FAILURE:
                return{
                    loading: false,
                    users: [],
                    error: action.payload,

                }
    }
}

const fetchUsers = () =>{
    return function(dispatch){
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            const users = response.data.map(user => user.id)
            dispatch(fetchUserSuccess(users))
        })
        .catch((error) => {
            const errors = error.message
            dispatch(fetchUserFailure(errors))
        })
    }
}

const store = createStore(fetchUserReducers, applyMiddleWare(thunkMiddleWare))
store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUsers())


// axios
//  a package used to make api calls

// redux thunk
// used to define async action creators/ its a middleware
// thunkMiddleware gives us ability of a action creator  to return  a function instead of a function
