import React, { PureComponent } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import PropTypes from "prop-types";

export class StatusBarStyling extends PureComponent {
    public static propTypes = {
        barStyle: PropTypes.string
    };

    public static defaultProps = {
        barStyle: "dark-content"
    };

    public render() {
        const { ...restProps } = this.props;

        return <StatusBar {...restProps} />;
    }
}

interface IProps {
    backgroundColor: string;
    barStyle: string;
}
interface IState {
    backgroundColor: string;
}

export class SafeArea extends PureComponent<IProps, IState> {
    public static propTypes = {
        backgroundColor: PropTypes.string,
        barStyle: PropTypes.string,
        style: PropTypes.shape({})
    };

    public static defaultProps = {
        backgroundColor: undefined,
        barStyle: undefined
    };

    /**
     * Returns custom StatusBar backgroundColor.
     */
    public static applyBarStyle = (backgroundColor: string, barStyle: any) => {
        let barBackroundColor = backgroundColor;
        if (!barBackroundColor) {
            if (barStyle === "light-content") {
                barBackroundColor = "black";
            }
            if (barStyle === "dark-content") {
                barBackroundColor = "white";
            }
        }
        return barBackroundColor;
    };

    // TODO: Fix errors from this.state
    // static getDerivedStateFromProps(nextProps: object) {
    //   let nextState = SafeArea.getComponentState(nextProps);

    //   if (_.isEqual(this.state, nextState)) {
    //     nextState = null;
    //   }

    //   return nextState;
    // }

    public static getComponentState = (props: IProps) => {
        const { barStyle } = props;
        let { backgroundColor } = props;

        backgroundColor = SafeArea.applyBarStyle(backgroundColor, barStyle);

        return {
            backgroundColor
        };
    };

    constructor(props: IProps, context: any) {
        super(props, context);

        const componentState = SafeArea.getComponentState(props);

        this.state = {
            ...componentState
        };
    }

    public render() {
        const {
            // eslint-disable-next-line no-unused-vars
            backgroundColor: excludedBackgroundColor,
            barStyle,
            children,
            ...restProps
        } = this.props;
        // eslint-disable-next-line no-redeclare
        const { backgroundColor } = this.state;

        return (
            <SafeAreaView {...restProps}>
                <StatusBarStyling barStyle={barStyle} />
                {children}
            </SafeAreaView>
        );
    }
}

export default StatusBarStyling;
