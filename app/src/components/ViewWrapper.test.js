import React from 'react';
import {store, history} from '../store/configureStore';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {render} from '@testing-library/react';
import ViewWrapper from './ViewWrapper';

test('wraps view correctly with empty params', () => {
    const history = createMemoryHistory({
        initialEntries: ['/starting/point']
    });
    const match = {
        params: {
            path: "one/two"
        }
    };
    const location = {
        search: "view=fish"
    };

    const {getByText} = render(
        <Router history={history}>
            <Provider store={store}>
                <ViewWrapper />
            </Provider>
        </Router>
    );
    // expect(getByText(/myfile.txt/i)).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/starting/point');
});

