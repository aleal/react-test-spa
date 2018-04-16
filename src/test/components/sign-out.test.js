import React from 'react';
import {renderComponent} from '../test-helper';
import SignOut from '../../components/sign-out';

describe('Sign Out Tests' , () => {
    
    let component;

    beforeEach(() => {
        component = renderComponent(SignOut);
    });
  
    it('renders sign out page', () => {
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});