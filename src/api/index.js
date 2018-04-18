import { stopSubmit, reset } from 'redux-form';

export function getApiUrl() {
    switch(process.env.API_URL) {
    case 'local':
        return 'http://localhost:3000';
    default:
        return 'http://localhost:3000';//'https://serene-inlet-95437.herokuapp.com';
    } 
}

function getAuthorizationHeaders() {
    const token = localStorage.getItem('token');//_.get(store.getState(),'userData.token',''); 
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
    const requestConfig = {method, headers}
    if (['get','head'].indexOf(method) < 0) {
        requestConfig.body = JSON.stringify(params);
    }
    fetch(url, requestConfig).then(checkResponseStatus)
    .then(getResponseJson)
    .then((responseJson)=>{
        dispatch(callbackSuccess(responseJson))
        if(formName) {
            dispatch(reset(formName));
        }
    }).catch((response) => {
        if(response.json) {
            getResponseJson(response)
            .then((responseJson)=>{
                if(responseJson.errors) {
                    dispatch(stopSubmit(formName, responseJson.errors));
                    dispatch(callbackFailure('Error'));
                } else {
                    dispatch(callbackFailure(responseJson.error));
                }
            })
            .catch((response)=>dispatch(callbackFailure(response.statusText)));
        } else {
            dispatch(callbackFailure("Can't connect to server! :("))
        }
    });
}