import { stopSubmit } from 'redux-form';

export function getApiUrl() {
    switch(process.env.API_URL) {
    case 'local':
        return 'http://localhost:3000';
    default:
        return "https://serene-inlet-95437.herokuapp.com";
    } 
}

function getAuthorizationHeaders() {
    const token = ""; // TODO GET TOKEN 
    return {
      'Content-Type': 'application/json',
      'Authorization': token
    };
}

function checkResponseStatus(response) {
    if (response.ok) { 
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  }
  
  function getResponseJson(response) {
    return response.json();
  }
  
  export function performFetch(path, method, params, formName, dispatch, callbackSuccess, callbackFailure) {
    const headers = getAuthorizationHeaders();
    const url = `${getApiUrl()}/${path}`;
    return fetch(url,{
        method,
        headers,
        body: JSON.stringify(params)
    }).then(checkResponseStatus)
    .then(getResponseJson)
    .then((responseJson)=>dispatch(callbackSuccess(responseJson)))
    .catch((response) => {
        if(response.json) {
            getResponseJson(response)
            .then((responseJson)=>{
                console.log(responseJson);
                if(responseJson.errors) {
                    dispatch(stopSubmit(formName, responseJson.errors));
                    dispatch(callbackFailure(''));
                } else {
                    dispatch(callbackFailure(responseJson.error || "Unknown Error"));
                }
            })
            .catch((response)=>dispatch(callbackFailure(response.statusText)));
        } else {
            dispatch(callbackFailure("Can't connect to server! :("))
        }
    });
}