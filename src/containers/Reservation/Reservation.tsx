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

import { NavigationScreenProp } from "react-navigation";

interface IProps {

}

interface IState {

}

class ReservationScreen extends Component<IProps, IState>{

    public render() {
        return (
            <View>
                <Text>HomePage</Text>
            </View>
        )
    }

}

export default ReservationScreen;