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

export const FETCH_DOGS = "fetchDogs";
export const FETCH_DOGS_SUCCESS = "fetchDogsSuccess";
export const FETCH_DOGS_FAILURE = "fetchDogsSuccess";
export const ADD_DOG = "addDog";
export const ADD_DOG_SUCCESS = "addDogSuccess";
export const ADD_DOG_FAILURE = "addDogFailure";

export function fetchDogs(dispatch) {
    performFetch('dogs', 'get', {}, "", dispatch, fetchDogsSuccess, fetchDogsFailure);
    return {
        type: FETCH_DOGS,
        status: ACTION_STATUSES.LOADING
    };
}

export function fetchDogsSuccess(response) {
   return {
        type: FETCH_DOGS_SUCCESS,
        payload: response,
        status: ACTION_STATUSES.SUCCESS
   };
}

export function fetchDogsFailure(response) {
    return {
         type: FETCH_DOGS_FAILURE,
         payload: response.error,
         status: ACTION_STATUSES.ERROR
    };
 }

 export function addDog(dog,formName,dispatch) {
    performFetch('dogs', 'post', {dog}, formName, dispatch, addDogSuccess, addDogFailure);
    return {
        type: ADD_DOG,
        status: ACTION_STATUSES.LOADING
    };
}

export function addDogSuccess(response) {
   return {
        type: ADD_DOG_SUCCESS,
        payload: [response],
        status: ACTION_STATUSES.SUCCESS
   };
}

export function addDogFailure(error) {
    return {
         type: ADD_DOG_FAILURE,
         payload: error,
         status: ACTION_STATUSES.ERROR
    };
 }

 export const ADD_LIKE = 'addLike';
 export const ADD_LIKE_SUCCESS = 'addLikeSuccess';
 export const ADD_LIKE_FAILURE = 'addLikeFailure';


 export function addLike(like, dispatch) {
    performFetch('likes', 'post', {like}, '', dispatch, addLikeSuccess, addLikeFailure);
    return {
        type: ADD_LIKE,
        status: ACTION_STATUSES.LOADING
    };
 }

 export function addLikeSuccess(response) {
    return {
        type: ADD_LIKE_SUCCESS,
        payload: response,
        status: ACTION_STATUSES.SUCCESS
    };
 }

 export function addLikeFailure(response) {
    return {
        type: ADD_LIKE_FAILURE,
        payload: response,
        status: ACTION_STATUSES.ERROR
    };
 }


 export const GET_USER_PROFILE = 'getUserProfile';
 export const GET_USER_PROFILE_SUCCESS = 'getUserProfileSuccess';
 export const GET_USER_PROFILE_FAILURE = 'getUserProfileFailure';


 export function getUserProfile(id, dispatch) {
    performFetch(`users/${id}`, 'get', {}, '', dispatch, getUserProfileSuccess, getUserProfileFailure);
    return {
        type: GET_USER_PROFILE,
        status: ACTION_STATUSES.LOADING
    };
 }

 export function getUserProfileSuccess(response) {
    return {
        type: GET_USER_PROFILE_SUCCESS,
        payload: response,
        status: ACTION_STATUSES.SUCCESS
    };
 }

 export function getUserProfileFailure(response) {
    return {
        type: GET_USER_PROFILE_FAILURE,
        payload: response,
        status: ACTION_STATUSES.ERROR
    };
 }