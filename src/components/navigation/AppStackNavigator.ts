import { createStackNavigator, NavigationContainer } from "react-navigation";

/* Root Stack */

import ReservationScreen from "../../containers/Reservation/Reservation";
import AddReservationScreen from "../../containers/AddReservation/AddReservation";

const RootStack = createStackNavigator(
    {
        Reservation: ReservationScreen,
        AddReservation: AddReservationScreen
    },
    {
        initialRouteName: "Reservation",
        headerMode: "none"
    }
);

const AppStackNavigator: NavigationContainer = createStackNavigator(
    {
        Root: {
            screen: RootStack
        }
    },
    {
        headerMode: "none",
    }
);

export default AppStackNavigator;