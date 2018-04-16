import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {signOut} from '../actions';

class SignOut extends React.Component {

    componentDidMount(){
        if(!_.isEmpty(this.props.user)) { 
            this.props.signOut();
        }
    }

    render () {
        return (
            <div className="container">
                <h2> Sign out </h2>
                <p> You has been signed out. See you soon!!! </p> 
            </div>
        );
    }
}

function mapStatsToProps({userData:{user}}) {
    return {user};
}

export default connect(mapStatsToProps,{signOut})(SignOut);