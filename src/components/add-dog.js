import _ from 'lodash';
import React from 'react';
import {reduxForm, reset} from 'redux-form';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {addDog, ACTION_STATUSES} from '../actions';
import {FIELD_CONFIGS, renderForm, validateForm, imageFileToBase64} from './forms/forms-helper';

const FORM_NAME = "AddDogForm";

const FIELDS = {
    name: FIELD_CONFIGS.name,
    picture: FIELD_CONFIGS.picture
};

class AddDog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {picture:''};
    }

    handleSubmit(values) {
        values.picture = this.state.picture;
        values.user_id = this.props.user.id
        this.props.addDog(values, FORM_NAME, this.props.dispatch);
    }
    
    onPictureChange(e) {
        const file = e.target.files[0];
        if(file) {
            imageFileToBase64(file,(picture) => {
                this.setState({picture});
            });
        } else {
            this.setState({picture:''});
        }
    }

    render() {
        const events = {
            picture: {
                onChange: this.onPictureChange.bind(this)
            }
        };
        return (
            <div className="container">
                <h3>Add Dog</h3>
                {renderForm(this, FIELDS, events,'/home')}
            </div>
        );
    }
    
}

function mapStateToProps({userData:{user},dogData:{dogs, error, status}}) {
    return {user, dog: _.get(dogs,'0'), error, status};
}

export default reduxForm({
    validate: (values)=>{return validateForm(FIELDS,values)},
    fields: _.mapKeys(FIELDS),
    form: FORM_NAME
})(
    connect(mapStateToProps,{addDog})(AddDog)
);