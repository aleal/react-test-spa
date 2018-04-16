import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import { createStore, applyMiddleware} from 'redux';
import reducers from '../reducers/index';

export function renderComponent(ComponentClass, props = {}, state = {}) {
    const componentInstance =  renderer.create(
        <Provider store={createStore(reducers, state)}>
            <MemoryRouter>
                <ComponentClass {...props} />
            </MemoryRouter>
        </Provider>
    );
    return componentInstance;
}