import React from 'react';
import {renderComponent} from '../test-helper';
import Index from '../../components/index';

describe('App Index Tests' , () => {
    
    let component;

    beforeEach(() => {
        component = renderComponent(Index);
    });
  
    it('renders index page', () => {
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});