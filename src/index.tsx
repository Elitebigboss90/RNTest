/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import App from "./containers/App"

const dogQuery = gql`
  query {
      reservations{
        id
        name
        hotelName
        arrivalDate
        departureDate
      },
  }
`;

const DogComponent = graphql(dogQuery)(props => {
  const { error, reservations } = props.data;
  if (error) {
    return <Text>{error}</Text>;
  }
  if (reservations) {
    return <Text>{reservations[0].name}</Text>;
  }

  return <Text>Loading...</Text>;
});

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev',
  }),
  cache: new InMemoryCache()
});

type Props = {};

export default class RNTest extends Component<Props> {
  render() {
    return (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
