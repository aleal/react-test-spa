import _ from 'lodash';
import React from 'react';
import {Field} from 'redux-form';
import {Link} from 'react-router-dom';
import {ACTION_STATUSES} from '../../actions';

export const FIELD_CONFIGS = { 
    email: {
        name: 'email',
        type: 'text',
        label: 'Email',
        validate: (value) => {
            if(!value || !value.trim().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                return 'Enter a valid email';
            }
            return null;
        }
    },
   password: {
        name: 'password',
        type: 'password',
        label: 'Password',
        validate: (value) => {
            if(!value || value.trim().length < 5) {
                return 'Enter a valid password. At least 5 characters.';
            }
            return null;
        }
    },
    name: {
        name: 'name',
        type: 'text',
        label: 'Name',
        validate: (value) => {
            if(!value || value.trim().length < 2) {
                return 'Enter a valid name. At least 2 characters.';
            }
            return null;
        }
    },
    avatar: {
        name: 'avatar',
        type: 'file',
        label: 'Avatar',
        validate: (value) => {
            if(value && value.length > 0 && _.get(value,'0.type','').indexOf("image") < 0) {
                 return 'Choose an image file. (*.png, *.jpeg, *.jpg)';
            }
            return null;
        }
    },
    picture: {
        name: 'picture',
        type: 'file',
        label: 'Picture',
        validate: (value) => {
            if(_.get(value,'0.type','').indexOf("image") < 0) {
                 return 'Choose an image file. (*.png, *.jpeg, *.jpg)';
            }
            return null;
        }
    }

};
export function imageFileToBase64(file, callback) {
    var reader  = new FileReader();
  
    reader.addEventListener("load", function () {
      var result = reader.result.indexOf('image') > -1 ? reader.result : "";
      callback(result);
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
}
function fieldRenderer(field) {
    const {meta: {touched,error}} = field;
    const className = `form-group ${touched && error ? 'has-danger' : '' }`
    let input = field.input
    if (field.type === 'file') {
      input = _.omit(input,"value"); 
    }
    return (
        <div className={className}>
        <label>{field.label}</label>
          <input className="form-control"
            type={field.type}
            {...input}
            />
            <div className="text-help">
            {touched ? error : ''}
            </div>
        </div>
    );
}
function renderFormField(fieldConfig, fieldEvents) {
    return <Field
        label={fieldConfig.label}
        name={fieldConfig.name}
        type={fieldConfig.type}
        key={fieldConfig.name}
        component={fieldRenderer}
        {...fieldEvents}
        />
}
export function validateForm(fields, values) {
    const errors = {};
    _.each(fields,(field)=> {
        const error = field.validate(values[field.name]);
        if(error) {
            errors[field.name] = error;
        }
    });
    return errors;
}

export function renderForm(formObj, fields, events={}, cancelRedirectTo = '/') {
    const {handleSubmit} = formObj.props;
    return (
        <div className="form" >
            <form onSubmit={handleSubmit(formObj.handleSubmit.bind(formObj))} >
               {renderFormStatusMessage(formObj)}
               {_.map(fields,(field) => { 
                   return renderFormField(field,_.get(events,field.name,{}));
                   })
                }
                <button type="submit" className="btn btn-primary" >Submit</button>
                <Link to={cancelRedirectTo} className="btn btn-danger btn-separator">Cancel</Link>
            </form>
        </div>
    );
}

function renderFormStatusMessage(formObj) {
    let className = '';
    let message = ''; 
    const status = _.get(formObj,'props.status',ACTION_STATUSES.NONE);
    if(status === ACTION_STATUSES.LOADING) {
        className = 'has-warning';
        message = 'Loading...';
    } else if (status === ACTION_STATUSES.SUCCESS && _.get(formObj,'props.obj')) {
        className = 'has-success';
        message = 'Success!'
    } else if (status === ACTION_STATUSES.ERROR) {
        className = 'has-danger';
        message = _.get(formObj,'props.error.authentication.0') 
        || _.get(formObj,'props.error','');
    }
    return (
        <div className={className}>
            <div className="text-help"> 
                {message}
            </div>
        </div>
    );
}