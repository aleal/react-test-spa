import { FETCH_DOGS, FETCH_DOGS_SUCCESS, FETCH_DOGS_FAILURE, ADD_DOG,
     ADD_DOG_SUCCESS, ADD_DOG_FAILURE, ACTION_STATUSES } from '../actions';

const INITIAL_STATE = {dogs: null, error: null, status: ACTION_STATUSES.NONE}; 

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
    case FETCH_DOGS:
        return { ...state, dogs: null, error: null, status: action.status}; 
    case FETCH_DOGS_SUCCESS:
        return { ...state, dogs: action.payload, error: null, status: action.status}; 
    case FETCH_DOGS_FAILURE:
        return { ...state, dogs: null, error: action.payload, status: action.status}; 
    case ADD_DOG:
        return { ...state, dogs: null, error: null, status: action.status}; 
    case ADD_DOG_SUCCESS:
        return { ...state, dogs: action.payload, error: null, status: action.status};
    case ADD_DOG_FAILURE:
        return { ...state, dogs: null, error: action.payload, status: action.status};
    default:
        return state;
    }
}
