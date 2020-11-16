import React from 'react';
import {render} from '@testing-library/react';
import TestView from './TestView';

test('shows editor view for local file', () => {
    const {getByText} = render(
        <TestView data={ {datasource:"@testsource", path:"/test.txt"} } view={ {type: "test"} } />
    );
    expect(getByText(/test.txt/i)).toBeInTheDocument();
});
