import React, { Component } from "react";
import { AppState } from "react-native";

import { createAppContainer, NavigationScreenProp } from "react-navigation";
import NavigationService from "../components/navigation/NavigationService"
import RootNavigator from "../components/navigation/RootNavigator";
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider, graphql } from 'react-apollo';
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';


const AppContainer = createAppContainer(RootNavigator);

interface IProps {

}

interface IState {
    appState: any;
}

const httpLink = createHttpLink({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
})

export const wsClient = new SubscriptionClient(`https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev`, {
    reconnect: true,
});

const webSocketLink = new WebSocketLink(wsClient);

const stateLink = withClientState({
    cache: new InMemoryCache,
    defaults: {},
    resolvers: {},
});


const requestLink = ({ queryOrMutationLink, subscriptionLink }:{queryOrMutationLink:any, subscriptionLink:any}) =>
    ApolloLink.split(
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return kind === 'OperationDefinition' && operation === 'subscription';
        },
        subscriptionLink,
        queryOrMutationLink,
    );

const link = ApolloLink.from([
    stateLink,
    requestLink({
        queryOrMutationLink: httpLink,
        subscriptionLink: webSocketLink,
    }),
]);

const client = new ApolloClient({
    link,
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