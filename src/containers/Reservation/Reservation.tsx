import React, { Component } from "react";
import {
    View,
    Text,
} from "react-native";
import PropTypes from "prop-types";

import { NavigationScreenProp } from "react-navigation";
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Header } from "../../common/Header/Header"
import { Button } from "../../common/Button/Button"
import { nextIcon } from "../../static/imports/icons"
import styles from "./styles"
import List from "./List/List"
//import console = require("console");

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

const newReservation = gql`
  subscription {
    reservation{
        node{
            id
            name
            hotelName
            arrivalDate
            departureDate
        }
    }
  }
`


class ReservationScreen extends Component<IProps, IState>{

    constructor(props: IProps) {
        super(props)

    }

    public static propTypes: any = {
        navigation: PropTypes.shape({}).isRequired,
    };


    public handleNavigation = () => {
        const { navigation } = this.props;
        navigation.navigate("AddReservation")
    }

    public handleItem = () => {
        /* 
        * TODO: Add item handler, give more props to each item, such as, delete, update. 
        **/
    }

    _subscribeToNewReservation = async (subscribeToMore: any) => {
        subscribeToMore({
            document: newReservation,
            updateQuery: (prev: any, { subscriptionData }: any) => {
                if (!subscriptionData.data) return prev
                const newReservation = subscriptionData.data.reservation.node;
                const exists = prev.reservations.find(({ id }: any) => id === newReservation.id);
                if (exists) return prev;

                return prev.reservations.push(subscriptionData.data.reservation.node)
            }
        })
    }

    public render() {
        return (
            <Query query={reservationQuery}>
                {({ loading, error, data, subscribeToMore }) => {
                    /*   
                    *   TODO: Add loading handler to make sure user won't see any thing blank
                    **/
                    this._subscribeToNewReservation(subscribeToMore);
                    return (
                        < View style={styles.container}>
                            <Header>
                                <View />
                                <View>
                                    <Text>HomePage</Text>
                                </View>
                                <View style={styles.iconContainer}>
                                    <Text>Add New</Text>
                                    <Button icon={nextIcon} onPress={this.handleNavigation} style={styles.headerIcon} />
                                </View>

                            </Header>

                            <View style={{ flex: 1 }}>
                                <List data={data.reservations} onPress={this.handleItem} />
                            </View>
                        </View>)
                }
                }
            </Query>
        )
    }

}

export default ReservationScreen;