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
        console.log("Reservation", subscribeToMore)
        subscribeToMore({
            document: newReservation,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev
                const newReservation = subscriptionData.data.reservation.node;
                const exists = prev.reservations.find(({ id }) => id === newReservation.id);
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
                                {console.log("get from", data, error)}
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