import React from 'react';
import {render} from '@testing-library/react';
import View from './View';

test('shows editor view for local /myfile.txt', () => {
    const {getByText} = render(
        <View datasource="local" path="/myfile.txt" view={ {type: "editor"} } />
    );
    expect(getByText(/myfile.txt/i)).toBeInTheDocument();
});

test('shows editor view for specific datasource', () => {
    const {getByText} = render(
        <View datasource="datasource" path="/myfile.txt" view={ {type: "editor"} } />
    );
    expect(getByText(/datasource/i)).toBeInTheDocument();
});
