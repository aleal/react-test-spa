import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Header extends React.Component {
    renderNavButtons() {
        const userName = _.get(this,'props.user.name');

        if(userName) {
            return (
                <span className="pull-xs-right"> 
                    <span>Hello, {userName} </span>
                    <Link className="btn" to="/sign-out" > Sign out </Link>
                </span>
            ); 
        } else {
            return (
                <span className="pull-xs-right">
                  <Link className="btn" to="/sign-in" > Sign in </Link>
                  <Link className="btn" to="/sign-up" > Sign up </Link>
                </span>
            );
        }

    }
    render(){
        return (
            <div className="container">
                <div className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"> 
                <Link to="/" className="pull-xs-left ">
                <img className="logo" alt='Logo' src="/logo.png"/>
                </Link>
                {this.renderNavButtons()}
                </div>
                <hr />
            </div>
        );
    }
}

function mapStateToProps({userData:{user}}) {
    return {user};
}

export default connect(mapStateToProps)(Header);