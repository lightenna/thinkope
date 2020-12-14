import React from 'react';
import {render, waitFor} from '@testing-library/react';
import DataWrapper from './DataWrapper';
import {Provider} from "react-redux";
import {store} from "../store/configureStore";
import DataLoadErrorBoundary from "./boundaries/DataLoadErrorBoundary";

// RTL tests
test('data wrapper with empty params functions without error', async () => {
    const path = "/", querystr = "";
    const {getByText} = render(
        <Provider store={store}>
            <DataLoadErrorBoundary>
                <DataWrapper.WrappedComponent match={{params:{path: path, url: path}}} location={{pathname: path, search: querystr}}/>
            </DataLoadErrorBoundary>
        </Provider>
    );
    await waitFor(() => {
        expect(getByText(/write something.../i)).toBeInTheDocument();
    })
});

test('data wrapper throws error when no such datasource', async () => {
    const datasource = "no-such-source";
    const path = "/path", querystr = "";
    const {getByText} = render(
        <Provider store={store}>
            <DataLoadErrorBoundary>
                <DataWrapper.WrappedComponent match={{params: {path: path, datasource: datasource}}} location={{search: querystr}}/>
            </DataLoadErrorBoundary>
        </Provider>
    );
    await waitFor(() => {
        expect(getByText(/Something went wrong/i)).toBeInTheDocument();
    })
});
