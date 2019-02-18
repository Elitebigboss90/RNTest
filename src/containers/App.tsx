import React, { Component } from "react";
import { AppState } from "react-native";

import { createAppContainer, NavigationScreenProp } from "react-navigation";
import NavigationService from "../components/navigation/NavigationService"
import RootNavigator from "../components/navigation/RootNavigator";
import NavigationService from "../components/navigation/NavigationService";

const AppContainer = createAppContainer(RootNavigator);

export interface IProps {

}

interface IState {
    appState: any;
}

class App extends Component<IProps, IState> {

    /**
   * AppContainer ref handler.
   *
   * https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
   */
    onContainerRef = (navigatorRef: any) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
    };

    public render() {
        return (
            <AppContainer ref={this.onContainerRef} />
        );
    }
}

export default App;