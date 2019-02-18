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
import PropTypes from "prop-types";
import { Header } from "../../common/Header/Header"
import { Button } from "../../common/Button/Button"
import { nextIcon } from "../../static/imports/icons"
import styles from "./styles"
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { NavigationScreenProp } from "react-navigation";
import List from "./List/List"

interface IProps {
    navigation: NavigationScreenProp<any, any>;
}

interface IState {

}

const reservationQuery = gql`
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


class ReservationScreen extends Component<IProps, IState>{

    public static propTypes: any = {
        navigation: PropTypes.shape({}).isRequired,
    };


    public handleNavigation = () => {
        const { navigation } = this.props;
        navigation.navigate("AddReservation")
    }

    public handleItem = () => {

    }

    public render() {
        const linksToRender = [
            {
                id: '1',
                name: 'Prisma turns your database into a GraphQL API 😎',
                date: 'https://www.prismagraphql.com',
            },
            {
                id: '2',
                name: 'The best GraphQL client',
                date: 'https://www.apollographql.com/docs/react/',
            },
        ]

        return (
            <Query query={reservationQuery}>
                {({ loading, error, data }) => < View style={styles.container}>
                    <Header>
                        <View />
                        <View>
                            <Text>HomePage</Text>
                        </View>
                        <Button icon={nextIcon} onPress={this.handleNavigation} style={styles.headerIcon} />
                    </Header>

                    <View style={{ flex: 1 }}>
                        {console.log("get from", data, error)}
                        <List data={data.reservations} onPress={this.handleItem} />
                    </View>
                </View>}
            </Query>
        )
    }

}

export default ReservationScreen;