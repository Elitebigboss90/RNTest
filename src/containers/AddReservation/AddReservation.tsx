import React, { Component } from "react";
import {
    NativeModules,
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
    dispatch: (action: any) => void;
    navigation: NavigationScreenProp<any, any>;
    // provider: any;
    userProfile?: any;
}

interface IState {
    sdkInitialized: boolean;
    webrtcRequestManager: boolean | null;
    activeModal: boolean;
    currentInputMethod: string;
    shouldKeyboardFocus: boolean;
    appState: string;
}

class AddReservationScreen extends Component<IProps, IState>{

    public render() {
        return (
            <View>
                <Text>AddReservationScreen</Text>
            </View>
        )
    }

}

export default AddReservationScreen;