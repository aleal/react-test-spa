import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

export function renderComponent(ComponentClass, props = {}) {
    const componentInstance =  renderer.create(
        <MemoryRouter>
            <ComponentClass {...props} />
        </MemoryRouter>
    );
    return componentInstance;
}