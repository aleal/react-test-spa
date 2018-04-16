import React from 'react';
import {renderComponent} from '../test-helper';
import SignIn from '../../components/sign-in';

describe('Sign In Tests' , () => {
    
    let component;

    beforeEach(() => {
        component = renderComponent(SignIn);
    });
  
    it('renders sign in page', () => {
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});