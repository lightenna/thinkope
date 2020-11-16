import React from 'react';
import {mount, shallow} from '../../enzyme_wrapper';
import EditorView from './EditorView';

test('editor view instantiates without error', () => {
    const wrapper = mount(
        <EditorView view={{}} data={{}} />
    );
    const html = wrapper.html();
    expect(wrapper.find('.type-editor')).toHaveLength(1);
    wrapper.unmount();
});
