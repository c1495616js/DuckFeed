import * as actionTypes from '../actions/types'
import { combineReducers } from 'redux';

/* User reducer */ 

const initialUser = {
  currentUser: null,
  isLoading: true
}

const user_reducer = (state = initialUser, action) => {
  switch(action.type){
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        loading: false
      }
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
}

/* Search Reducer */
const initialSearch = {
  park:[],
  name:[],
  kind:[]
}

const search_reducer = (state = initialSearch, action) => {
  switch(action.type){
    case actionTypes.DO_SEARCH:
      return {
        currentSearch: action.payload.currentSearch,
        // loading: false
      }
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  user: user_reducer,
  search: search_reducer
})

export default rootReducer;