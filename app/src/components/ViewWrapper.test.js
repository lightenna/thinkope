import React from 'react';
import {render, waitFor} from '@testing-library/react';
import {mount} from '../enzyme_wrapper';
import {createWaitForElement} from 'enzyme-wait';
import ViewWrapper from './ViewWrapper';
import {Provider} from "react-redux";
import {store} from "../store/configureStore";
import {EditorState} from "draft-js";

// Enzyme tests
test('wraps view correctly with empty params', async () => {
    const path = "", datasource = undefined, querystr = "";
    const editor_state = EditorState.createEmpty();
    const waitFor = createWaitForElement('#view-wrapper');
    const wrapper = mount(
        <Provider store={store}>
            <ViewWrapper editorState={editor_state} metadata={{path: path, datasource: datasource}}
                         location={{search: querystr}}/>
        </Provider>
    );
    const component = await waitFor(wrapper);
    expect(component.find('.view')).toHaveLength(1);
    wrapper.unmount();
});

test('wraps view correctly with multiple sub-views', async () => {
    const path = "/one/two", datasource = undefined,
        querystr = "view={\"type\":\"container\",\"orient\":\"horiz\",\"split\":[35.0,65.0],\"sub\":[{\"type\":\"test\"},{\"type\":\"test\"}]}";
    const editor_state = EditorState.createEmpty();
    const waitFor = createWaitForElement('#view-wrapper');
    const wrapper = mount(
        <Provider store={store}>
            <ViewWrapper editorState={editor_state} metadata={{path: path, datasource: datasource}}
                         location={{search: querystr}}/>
        </Provider>
    );
    const component = await waitFor(wrapper);
    const html = wrapper.html();
    // check for container view with two nested subviews
    expect(component.find('.view')).toHaveLength(3);
    expect(component.find('.type-container')).toHaveLength(1);
    expect(component.find('.type-test')).toHaveLength(2);
    wrapper.unmount();
});

// RTL tests
test('wraps view correctly with typical params', async () => {
    const path = "/one/two", datasource = undefined, querystr = "view=test";
    const editor_state = EditorState.createEmpty();
    const {getByText} = render(
        <Provider store={store}>
            <ViewWrapper editorState={editor_state} metadata={{path: path, datasource: datasource}}
                         location={{search: querystr}}/>
        </Provider>
    );
    await waitFor(() => {
        expect(getByText(/view of \/one\/two/i)).toBeInTheDocument();
    })
});

test('wraps view correctly with typical params and query string text', () => {
    const path = "one/two", datasource = undefined, querystr = "view=fish";
    const editor_state = EditorState.createEmpty();
    const {getByText} = render(
        <Provider store={store}>
            <ViewWrapper editorState={editor_state} metadata={{path: path, datasource: datasource}}
                         location={{search: querystr}}/>
        </Provider>
    );
    expect(getByText(/`fish` view/i)).toBeInTheDocument();
});

test('wraps view correctly with typical params and query string JSON object', () => {
    const path = "one/two", datasource = undefined,
        querystr = "view={\"type\":\"fish\",\"x\":0.00002345,\"y\":0.000006789,\"w\":1.0,\"h\":0.05}";
    const editor_state = EditorState.createEmpty();
    const {getByText} = render(
        <Provider store={store}>
            <ViewWrapper editorState={editor_state} metadata={{path: path, datasource: datasource}}
                         location={{search: querystr}}/>
        </Provider>
    );
    expect(getByText(/`fish` view/i)).toBeInTheDocument();
});
