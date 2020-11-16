import React from 'react';
import {render} from '@testing-library/react';
import GenericView from './GenericView';

test('shows editor view for local /myfile.txt', () => {
    const {getByText} = render(
        <GenericView datasource="local" path="/myfile.txt" view={ {type: "editor"} } />
    );
    expect(getByText(/myfile.txt/i)).toBeInTheDocument();
});

test('shows editor view for specific datasource', () => {
    const {getByText} = render(
        <GenericView datasource="datasource" path="/myfile.txt" view={ {type: "editor"} } />
    );
    expect(getByText(/datasource/i)).toBeInTheDocument();
});
