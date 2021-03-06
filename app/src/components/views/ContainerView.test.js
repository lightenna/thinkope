import React from 'react';
import {mount} from '../../enzyme_wrapper';
import ContainerView from './ContainerView';

test('container view instantiates without error', () => {
    const wrapper = mount(
        <ContainerView view={{}} sub={[0,0]} />
    );
    expect(wrapper.find('.orient-horiz')).toHaveLength(1);
    wrapper.unmount();
});

test('container view works with 3 subviews', () => {
    const sub_array = [0,0,0];
    const wrapper = mount(
        <ContainerView view={{}} sub={sub_array} />
    );
    expect(wrapper.find('.orient-horiz')).toHaveLength(1);
    expect(wrapper.find('.sub')).toHaveLength(sub_array.length);
    wrapper.unmount();
});
