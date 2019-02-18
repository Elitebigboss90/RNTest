import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Keyboard,
    AppState,
    Alert,
    AsyncStorage
} from "react-native";
import PropTypes from "prop-types";
import { Header } from "../../common/Header/Header"
import { Button } from "../../common/Button/Button"
import { nextIcon } from "../../static/imports/icons"
import styles from "./styles"
import { NavigationScreenProp } from "react-navigation";

interface IProps {
    navigation: NavigationScreenProp<any, any>;
}

interface IState {

}

class AddReservationScreen extends Component<IProps, IState>{

    public static propTypes: any = {
        navigation: PropTypes.shape({}).isRequired,
    };

    public handleNavigation = () => {
        const { navigation } = this.props;
        navigation.goBack()
    }

    public render() {
        return (
            <Header>
                <Button icon={nextIcon} onPress={this.handleNavigation} style={styles.headerIcon} />
                <View>
                    <Text>Add New Reservation</Text>
                </View>
                <View />
            </Header >
        )
    }

}

export default AddReservationScreen;