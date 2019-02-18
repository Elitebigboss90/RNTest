import { createSwitchNavigator, NavigationContainer } from "react-navigation";

import AppStackNavigator from "./AppStackNavigator";

const RootNavigator: NavigationContainer = createSwitchNavigator(
    {
        App: AppStackNavigator
    },
    {
        initialRouteName: "App"
    }
);

export default RootNavigator;
