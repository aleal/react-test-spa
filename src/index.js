import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Index from './components/index';
import Header from './components/header';

ReactDOM.render(
    <BrowserRouter >
      <div className="page-container">
        <Header /> 
        <Switch>
          <Route path="/" exact component={Index} />
        </Switch>
      </div>
    </BrowserRouter>, document.getElementById('root'));

