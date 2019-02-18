import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
const client = new ApolloClient({
    uri: 'https://my.api/v1',
    /* the magic */
    clientState: {
        defaults: {},
        resolvers: {},
        typeDefs: ``,
    },
});