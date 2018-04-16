import React from 'react';
import {renderComponent} from '../test-helper';
import SignUp from '../../components/sign-up';

describe('Sign Up Tests' , () => {
    
    let component;

    beforeEach(() => {
        component = renderComponent(SignUp);
    });
  
    it('renders sign up page', () => {
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});