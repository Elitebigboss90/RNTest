import React, { Component } from "react";
import { AppState } from "react-native";

import { createAppContainer, NavigationScreenProp } from "react-navigation";
import NavigationService from "../components/navigation/NavigationService"
import RootNavigator from "../components/navigation/RootNavigator";
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider, graphql } from 'react-apollo';

const AppContainer = createAppContainer(RootNavigator);

export interface IProps {

}

interface IState {
    appState: any;
}

const httpLink = createHttpLink({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});


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
            <ApolloProvider client={client}>
                <AppContainer ref={this.onContainerRef} />
            </ApolloProvider>
        );
    }
}

export default App;