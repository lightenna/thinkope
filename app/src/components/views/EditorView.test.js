import React from 'react';
import {mount} from '../../enzyme_wrapper';
import EditorView from './EditorView';

test('editor view instantiates without error', () => {
    const wrapper = mount(
        <EditorView view={{}} data={{}} />
    );
    expect(wrapper.find('.type-editor')).toHaveLength(1);
    wrapper.unmount();
});
