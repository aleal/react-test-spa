import React from 'react';
import {renderComponent} from '../test-helper';
import Header from '../../components/header';

describe('App Index Tests' , () => {
    
    let component;

    beforeEach(() => {
        component = renderComponent(Header);
    });
  
    it('renders header when user is not signed in', () => {
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});