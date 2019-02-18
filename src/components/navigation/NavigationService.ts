import {
    NavigationActions,
    NavigationBackActionPayload,
    NavigationProp
} from "react-navigation";

let navigator: NavigationProp<any>;

function setTopLevelNavigator(navigatorRef: any) {
    navigator = navigatorRef;
}

function getCurrentRoute() {
    let route = navigator.state.nav;
    while (route.routes) {
        route = route.routes[route.index];
    }
    return route;
}

function getRouteName(): string {
    const currentRoute = getCurrentRoute();
    return currentRoute.routeName;
}

function goBack(options?: NavigationBackActionPayload) {
    navigator.dispatch(NavigationActions.back(options));
}

function navigate(routeName: string, params?: any) {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
}

export default {
    getCurrentRoute,
    getRouteName,
    goBack,
    navigate,
    setTopLevelNavigator
};
