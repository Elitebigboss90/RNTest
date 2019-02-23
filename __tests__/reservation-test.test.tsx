import React from 'react';
import Reservation from '../src/containers/Reservation/Reservation';
import { shallow, ShallowWrapper } from "enzyme";
import { View } from "react-native";
import * as navigation from "react-navigation";

import renderer from 'react-test-renderer';

const createTestProps = (props: Object) => ({
    navigation: {
        navigate: jest.fn()
    },
    ...props
});

describe("ReservationScreen", () => {
    describe("rendering", () => {
        let wrapper: ShallowWrapper;
        let props: any;   // use type "any" to opt-out of type-checking
        beforeEach(() => {
            props = createTestProps({});
            wrapper = shallow(<Reservation {...props} />);   // no compile-time error
        });

        it("should render a <View />", () => {
            expect(props.navigation.navigate).toHaveBeenCalledWith('Reservation');   // SUCCESS
        });
    });
});
