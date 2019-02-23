import React, { Component } from "react";
import { Image, ViewPropTypes, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const defaultStyle = { flex: 1 };

interface IProps {
    icon: any;
    onPress: () => void;
    style: any;
    testID: string;
}

export class Button extends Component<IProps> {
    public static defaultProps = {
        style: defaultStyle
    };

    public static propTypes = {
        style: ViewPropTypes.style,
        onPress: PropTypes.func.isRequired,
        icon: PropTypes.any,
        testID: PropTypes.string
    };

    public onButtonPress = () => {
        const { onPress } = this.props;

        onPress();
    };

    render() {
        const { style, icon, testID } = this.props;
        return (
            <TouchableOpacity testID={testID} onPress={this.onButtonPress} style={style}>
                <Image source={icon} style={style} />
            </TouchableOpacity >
        );
    }
}