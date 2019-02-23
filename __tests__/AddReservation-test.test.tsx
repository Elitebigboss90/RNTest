import React from 'react';
import AddReservation from '../src/containers/AddReservation/AddReservation';
import { shallow, ShallowWrapper } from "enzyme";
import { View } from "react-native";

import { MockedProvider } from 'react-apollo/test-utils';

import renderer from 'react-test-renderer';
import console = require('console');

const createTestProps = (props: Object) => ({
    navigation: {
        state: { params: {} },
        dispatch: jest.fn(),
        goBack: jest.fn(),
        dismiss: jest.fn(),
        navigate: jest.fn(),
        openDrawer: jest.fn(),
        closeDrawer: jest.fn(),
        toggleDrawer: jest.fn(),
        getParam: jest.fn(),
        setParams: jest.fn(),
        addListener: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
        pop: jest.fn(),
        popToTop: jest.fn(),
        isFocused: jest.fn()
    },
    ...props
});




describe("AddReservationScreen", () => {
    describe("rendering", () => {
        let wrapper: ShallowWrapper;
        let props: any;   // use type "any" to opt-out of type-checking
        let navigation: any;
        beforeEach(() => {
            props = createTestProps({});
            navigation = { navigate: jest.fn() };
            wrapper = shallow(<AddReservation navigation={navigation} {...props} />);

        });

        it('should render the landing page without crashing', () => {
            const rendered = renderer.create(<MockedProvider mocks={[]}><AddReservation navigation={navigation} {...props} /></MockedProvider>).toJSON();
            expect(rendered).toBeTruthy();
        })

        it('should render the child element', () => {
            //const wrapper = shallow(<AddReservation navigation={navigation} {...props} />);
            const rendered = renderer.create(<MockedProvider mocks={[]}><AddReservation navigation={navigation} {...props} /></MockedProvider>);
            const renderedInstance = rendered.root;
            expect(rendered).toMatchSnapshot();
            expect(renderedInstance.findByProps({ testID: '#name' })).toBeTruthy();
        })

        it("should check the states if mounted right", () => {
            expect(wrapper.state('arrivalDateISO')).toBe("");
        });

        it("should render a mounted Mutation", () => {
            expect(wrapper.find('Mutation')).toHaveLength(1);
        });

        /*it("should check the navigation if it's goes back", () => {
            const spy = jest.spyOn(navigation, 'navigate')
            const backButton = wrapper.find('Button').at(0);
            backButton.props().onClick;
            expect(spy).toBeCalledWith('Reservation');
            //expect(props.navigation.navigate).toHaveBeenCalledWith('Reservation');   // SUCCESS
        });*/

        it('should check the navigation if its goes back', () => {
            const component = renderer.create(<MockedProvider mocks={[]}><AddReservation navigation={navigation} {...props} /></MockedProvider>);
            const backButton = component.root.findByProps({ testID: '#back' })
            backButton.props.onPress();
            expect(component).toMatchSnapshot();
            expect(props.navigation.goBack).toHaveBeenCalled();
            //@ts-ignore
            //component._handleNameInput('ethan');
            //@ts-ignore
            //expect(component.state.name).toEqual('ethan')
        });

        it('should check the nameInput if its update state correctly', () => {
            const component = shallow(<AddReservation navigation={navigation} {...props} />);
            const componentInstance = component.instance();
            expect(component).toMatchSnapshot();
            //const spy = jest.spyOn(AddReservation.prototype, '_handelName');
            //@ts-ignore
            componentInstance._handleNameInput('ethan');
            //@ts-ignore
            expect(componentInstance.state.name).toEqual('ethan');
        });
    });
});
