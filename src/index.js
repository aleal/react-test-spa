import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Index from './components/index';
import Header from './components/header';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
import SignOut from './components/sign-out';
import {store} from './store';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter >
        <div className="page-container">
            <Header /> 
            <Switch>
                <Route path="/sign-out" exact component={SignOut} /> 
                <Route path="/sign-up" exact component={SignUp} /> 
                <Route path="/sign-in" exact component={SignIn} />            
                <Route path="/" exact component={Index} />
            </Switch>
        </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

