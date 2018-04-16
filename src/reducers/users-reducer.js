import {AUTHENTICATE, CREATE_USER, AUTHENTICATE_SUCCESS, CREATE_USER_SUCCESS, 
    AUTHENTICATE_FAILURE, CREATE_USER_FAILURE, SIGN_OUT, 
    ACTION_STATUSES} from '../actions';

const INITIAL_STATE = {user: null, token: null, error: null, status: ACTION_STATUSES.NONE};

export default function(state = INITIAL_STATE, action) {
    const status = action.status || ACTION_STATUSES.NONE;
    switch(action.type) {
    case AUTHENTICATE:
    case CREATE_USER:
        return { ...state, user: null, token: null, error: null, status}; 
    case AUTHENTICATE_SUCCESS:
    case CREATE_USER_SUCCESS:
        return { ...state, ...action.payload, token: null, error: null, status}; 
    case AUTHENTICATE_FAILURE:
    case CREATE_USER_FAILURE:
        return { ...state, user: null, token: null, error: action.payload, status};
    case SIGN_OUT:
        return {};
    default:
        return state;
    }
}