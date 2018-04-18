import {AUTHENTICATE, CREATE_USER, AUTHENTICATE_SUCCESS, CREATE_USER_SUCCESS, AUTHENTICATE_FAILURE, CREATE_USER_FAILURE, SIGN_OUT, 
    ACTION_STATUSES, GET_USER_PROFILE, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAILURE} from '../actions';

const INITIAL_STATE = {user: null, token: null, error: null, status: ACTION_STATUSES.NONE};

export default function(state = INITIAL_STATE, action) {
    const status = action.status || ACTION_STATUSES.NONE;
    switch(action.type) {
    case AUTHENTICATE:
    case CREATE_USER:
        return { ...state, user: null, token: null, error: null, status}; 
    case AUTHENTICATE_SUCCESS:
    case CREATE_USER_SUCCESS:
        return { ...state, ...action.payload, error: null, status}; 
    case AUTHENTICATE_FAILURE:
    case CREATE_USER_FAILURE:
        return { ...state, user: null, token: null, error: action.payload, status};
    case GET_USER_PROFILE:
        return { ...state, userProfile: null, error: action.payload, status};
    case GET_USER_PROFILE_SUCCESS:
        return { ...state, userProfile: action.payload, error: null, status};    
    case GET_USER_PROFILE_FAILURE:
        return { ...state, userProfile: null, error: action.payload, status};
    case SIGN_OUT:
        return {};
    default:
        return state;
    }
}