import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '../src/common/Button/Button';

describe('Button', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Button icon={""} style={{ height: 50, width: 20, backgroundColor: 'red' }} onPress={() => { }} />)
            expect(component).toMatchSnapshot()
        });
    });
});