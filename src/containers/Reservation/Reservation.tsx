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

class ReservationScreen extends Component<IProps, IState>{

    public static propTypes: any = {
        navigation: PropTypes.shape({}).isRequired,
    };

    public handleNavigation = () => {
        const { navigation } = this.props;
        navigation.navigate("AddReservation")
    }

    public render() {
        return (
            <View style={styles.container}>
                <Header>
                    <View />
                    <View>
                        <Text>HomePage</Text>
                    </View>
                    <Button icon={nextIcon} onPress={this.handleNavigation} style={styles.headerIcon} />
                </Header>

                <View>

                </View>
            </View>
        )
    }

}

export default ReservationScreen;