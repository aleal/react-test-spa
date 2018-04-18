import React from 'react';
import {renderComponent} from '../test-helper';
import Header from '../../components/header';

describe('App Index Tests' , () => {
    
    let component;
  
    it('renders header when user is not signed in', () => {
        localStorage.setItem('user',JSON.stringify({}));
        component = renderComponent(Header);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders header when user is signed in', () => {
        localStorage.setItem('user',JSON.stringify({name:'Test 123'}));
        component = renderComponent(Header,{}, {userData:{user:{name:'Test 123'}}});
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});