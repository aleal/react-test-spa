import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import decode from 'jwt-decode';
import Index from './components/index';
import Header from './components/header';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
import SignOut from './components/sign-out';
import Home from './components/home';
import AddDog from './components/add-dog';
import UserProfile from './components/user-profile';

import {store} from './store';

const checkAuth = () => {
    const token = localStorage.getItem('token');
    console.log('Token: ',token);
    let user = null;
    if (token) { 
      try {
        const { exp } = decode(token);
        console.log(exp);
        console.log(new Date().getTime());
        if (exp * 1000 > new Date().getTime()) {
            console.log('Authenticated....');
            return true;
        }
      } catch (e) {
      }
    }
    return false;
}
  
const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      checkAuth()
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/sign-in',
            state: { from: props.location }
          }} />
    )} />
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter >
        <div className="page-container">
            <Header /> 
            <Switch>
                <AuthRoute path="/user-profile/:id" exact component={UserProfile} />
                <AuthRoute path="/add-dog" exact component={AddDog} />
                <AuthRoute path="/home" exact component={Home} />
                <Route path="/sign-out" exact component={SignOut} /> 
                <Route path="/sign-up" exact component={SignUp} /> 
                <Route path="/sign-in" exact component={SignIn} />            
                <Route path="/" exact component={Index} />
            </Switch>
        </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

