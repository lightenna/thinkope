import React from 'react';
import {mount} from '../../enzyme_wrapper';
import EditorView from './EditorView';

test('editor view instantiates without error', () => {
    // fix Not implemented: window.scrollTo error
    // https://stackoverflow.com/questions/57311971/error-not-implemented-window-scrollto-how-do-we-remove-this-error-from-jest-t
    global.scrollTo = jest.fn();
    const wrapper = mount(
        <EditorView view={{}} data={{}} />
    );
    expect(wrapper.find('.type-editor')).toHaveLength(1);
    wrapper.unmount();
});
