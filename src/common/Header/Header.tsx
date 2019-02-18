import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles"

interface IProps {
    title?: string;
    button?: boolean;
}

export class Header extends Component<IProps> {

    public static propTypes = {
        title: PropTypes.string,
        isButton: PropTypes.bool
    };

    /**
   * Header along with safe area
   */
    getHeaderContent = () => {
        const { children } = this.props;

        return (
            <SafeAreaView>
                <View style={styles.container}>{children}</View>
            </SafeAreaView>
        );
    };

    public render() {
        const headerContent = this.getHeaderContent();
        return (
            <>
                {headerContent}
            </>
        )
    }
}