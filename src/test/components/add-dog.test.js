import React from 'react';
import {renderComponent} from '../test-helper';
import AddDog from '../../components/add-dog';

describe('Add Dog Tests' , () => {
    
    let component;

    beforeEach(() => {
        component = renderComponent(AddDog);
    });
  
    it('renders add dog page', () => {
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});