import React, { Component } from "react";
import { Image, ViewPropTypes, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const defaultStyle = { flex: 1 };

interface IProps {
    icon: any;
    onPress: () => {};
    style: any;
}

export class Button extends Component<IProps> {
    public static defaultProps = {
        style: defaultStyle
    };

    public static propTypes = {
        style: ViewPropTypes.style,
        onPress: PropTypes.func.isRequired,
        icon: PropTypes.any
    };

    public onButtonPress: () => any = () => {
        const { onPress } = this.props;

        onPress();
    };

    render() {
        const { style, icon } = this.props;
        return (
            <TouchableOpacity onPress={this.onButtonPress} style={style}>
                <Image source={icon} style={style} />
            </TouchableOpacity >
        );
    }
}