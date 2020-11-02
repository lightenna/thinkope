import React from 'react';
import {render} from '@testing-library/react';
import ViewWrapper from './ViewWrapper';

test('wraps view correctly with empty params', () => {
    const path = "", querystr = "";
    const {getByText} = render(
        <ViewWrapper.WrappedComponent match={{ params: { path: path}}} location={{ search: querystr}} />
    );
    expect(getByText(/view of \//i)).toBeInTheDocument();
});

test('wraps view correctly with typical params', () => {
    const path = "one/two", querystr = "";
    const {getByText} = render(
        <ViewWrapper.WrappedComponent match={{ params: { path: path}}} location={{ search: querystr}} />
    );
    expect(getByText(/view of \/one\/two/i)).toBeInTheDocument();
});

test('wraps view correctly with typical params and query string text', () => {
    const path = "one/two", querystr = "view=fish";
    const {getByText} = render(
        <ViewWrapper.WrappedComponent match={{ params: { path: path}}} location={{ search: querystr}} />
    );
    expect(getByText(/`fish` view/i)).toBeInTheDocument();
});

test('wraps view correctly with typical params and query string JSON object', () => {
    const path = "one/two", querystr = "view={\"type\":\"fish\",\"x\":0.00002345,\"y\":0.000006789,\"w\":1.0,\"h\":0.05}";
    const {getByText} = render(
        <ViewWrapper.WrappedComponent match={{ params: { path: path}}} location={{ search: querystr}} />
    );
    expect(getByText(/`fish` view/i)).toBeInTheDocument();
});

