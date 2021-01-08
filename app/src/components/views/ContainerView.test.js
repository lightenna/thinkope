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
