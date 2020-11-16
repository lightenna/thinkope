import React from 'react';
import {render} from '@testing-library/react';
import {mount, shallow} from '../enzyme_wrapper';
import ViewWrapper from './ViewWrapper';

// Enzyme tests
test('wraps view correctly with empty params', () => {
    const path = "", querystr = "";
    const wrapper = mount(
        <ViewWrapper.WrappedComponent match={{ params: { path: path}}} location={{ search: querystr}} />
    );
    const html = wrapper.html();
    expect(wrapper.find('.view')).toHaveLength(1);
    wrapper.unmount();
});

test('wraps container view correctly with multiple sub-views', () => {
    const path = "one/two", querystr = "view={\"type\":\"container\",\"orient\":\"horiz\",\"split\":[35.0,65.0],\"sub\":[{\"type\":\"generic\"},{\"type\":\"generic\"}]}";
    const wrapper = mount(
        <ViewWrapper.WrappedComponent match={{ params: { path: path}}} location={{ search: querystr}} />
    );
    // check for container view with two nested subviews
    expect(wrapper.find('.view')).toHaveLength(3);
    expect(wrapper.find('.type-container')).toHaveLength(1);
    expect(wrapper.find('.type-generic')).toHaveLength(2);
    wrapper.unmount();
});

// RTL tests
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
