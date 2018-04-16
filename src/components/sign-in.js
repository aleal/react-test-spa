import _ from 'lodash';
import React from 'react';
import {reduxForm} from 'redux-form';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {authenticate, ACTION_STATUSES} from '../actions';
import {FIELD_CONFIGS, renderForm, validateForm} from './forms/forms-helper';

const FORM_NAME = "SignInForm";

const FIELDS = {
    email: FIELD_CONFIGS.email,
    password: FIELD_CONFIGS.password
};

class SignIn extends React.Component {

    handleSubmit(values) {
      this.props.authenticate(values, FORM_NAME, this.props.dispatch);
    }

    render() {
        if(this.props.status === ACTION_STATUSES.SUCCESS) {
            return <Redirect to='/home' />;
        }
        return (
            <div className="container">
                <h3>Sign In</h3>
                {renderForm(this, FIELDS, {})}
            </div>
        );
    }
    
}

function mapStateToProps({userData:{user,error,status}}) {
    return {user,error,status};
}

export default reduxForm({
    validate: (values)=>{return validateForm(FIELDS,values)},
    fields: _.mapKeys(FIELDS),
    form: FORM_NAME
})(
    connect(mapStateToProps,{authenticate})(SignIn)
);