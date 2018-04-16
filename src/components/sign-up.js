import _ from 'lodash';
import React from 'react';
import {reduxForm} from 'redux-form';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createUser, ACTION_STATUSES} from '../actions';
import {FIELD_CONFIGS, renderForm, validateForm, imageFileToBase64} from './forms/forms-helper';

const FORM_NAME = "SignUp";

const FIELDS = {
    name: FIELD_CONFIGS.name,
    email: FIELD_CONFIGS.email,
    password: FIELD_CONFIGS.password,
    avatar: FIELD_CONFIGS.avatar
};

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {avatar:''};
    }

    handleSubmit(values) {
        values.avatar = this.state.avatar;
        this.props.createUser(values, FORM_NAME, this.props.dispatch);
    }

    onAvatarChange(e) {
        const file = e.target.files[0];
        if(file) {
            imageFileToBase64(file,(avatar) => {
                this.setState({avatar});
            });
        } else {
            this.setState({avatar:''});
        }
    }

    render() {
        if(this.props.status === ACTION_STATUSES.SUCCESS) {
            return <Redirect to='/home' />;
        }
        const events = {
            avatar: {
                onChange: this.onAvatarChange.bind(this)
            }
        };
        return (
            <div className="container">
                <h3>Sign Up</h3>
                {renderForm(this, FIELDS, events,'/')}
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
    connect(mapStateToProps,{createUser})(SignUp)
);