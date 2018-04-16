import {performFetch} from '../api';

export const ACTION_STATUSES = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
    NONE: 'none'
}

export const AUTHENTICATE = "authenticate";
export const AUTHENTICATE_SUCCESS= "authenticateSuccess";
export const AUTHENTICATE_FAILURE= "authenticateFailure";

export const CREATE_USER = "createUser";
export const CREATE_USER_SUCCESS = "createUserSuccess"; 
export const CREATE_USER_FAILURE = "createUserFailure";

export const SIGN_OUT= "signOut";
 

export function authenticate(credentials, formName, dispatch) {
    performFetch('authenticate', 'post', {credentials}, formName, dispatch, authenticateSuccess, authenticateFailure);
    return {
        type: AUTHENTICATE, 
        status: ACTION_STATUSES.LOADING
    };
}

export function authenticateSuccess(response) {
    return {
        type: AUTHENTICATE_SUCCESS,
        payload: response,
        status: ACTION_STATUSES.SUCCESS
    }
}

export function authenticateFailure(error) {
    return {
        type: AUTHENTICATE_FAILURE,
        payload: error,
        status: ACTION_STATUSES.ERROR
    }
} 

export function createUser(user, formName, dispatch) {
    performFetch('users', 'post', {user}, formName, dispatch, createUserSuccess, createUserFailure);
    return {
        type: CREATE_USER,
        status: ACTION_STATUSES.LOADING
    };
}

export function createUserSuccess(response) {
    return {
        type: CREATE_USER_SUCCESS,
        payload: response,
        status: ACTION_STATUSES.SUCCESS
    }
}

export function createUserFailure(error) {
    return {
        type: CREATE_USER_FAILURE,
        payload: error,
        status: ACTION_STATUSES.ERROR
    }
} 

export function signOut() {
    return {
        type: SIGN_OUT
    }
}