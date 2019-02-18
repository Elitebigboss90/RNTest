import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard,
    AppState,
    Alert,
    AsyncStorage
} from "react-native";
import PropTypes from "prop-types";
import { Header } from "../../common/Header/Header";
import { Button } from "../../common/Button/Button";
import { nextIcon } from "../../static/imports/icons";
import styles from "./styles";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { NavigationScreenProp } from "react-navigation";

interface IProps {
    navigation: NavigationScreenProp<any, any>;
}

interface IState {
    name: string,
    hotelName: string,
    arrivalDate: string,
    departureDate: string,
}

const Add_Reservation = gql`mutation PostMutation($name: String!, $hotelName: String!,$arrivalDate: String!, $departureDate: String!){
    createReservation(data:{name:$name,hotelName:$hotelName,arrivalDate:$arrivalDate,departureDate:$departureDate}){
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`

class AddReservationScreen extends Component<IProps, IState>{

    constructor(props: IProps) {
        super(props);
        this.state = {
            name: "",
            hotelName: "",
            arrivalDate: "",
            departureDate: "",
        }
    }

    public static propTypes: any = {
        navigation: PropTypes.shape({}).isRequired,
    };

    public handleNavigation = () => {
        const { navigation } = this.props;
        navigation.goBack()
    }

    public _handleMultiInput(stateName: string) {
        return (text: string) => {
            this.setState({ [stateName]: text })
        }
    }

    public _handleButton = () => {

    }

    public render() {
        const { name, hotelName, arrivalDate, departureDate } = this.state;

        return (
            <Mutation mutation={Add_Reservation} variables={{ name, hotelName, arrivalDate, departureDate }}>{PostMutation =>
                <View style={styles.container}>
                    <Header>
                        <Button icon={nextIcon} onPress={this.handleNavigation} style={styles.headerIcon} />
                        <View>
                            <Text>Add New Reservation</Text>
                        </View>
                        <View />
                    </Header >
                    <View>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={this._handleMultiInput('name')}
                            value={name}
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={this._handleMultiInput('hotelName')}
                            value={hotelName}
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={this._handleMultiInput('arrivalDate')}
                            value={arrivalDate}
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={this._handleMultiInput('departureDate')}
                            value={departureDate}
                        />
                        <TouchableOpacity onPress={PostMutation}>
                            <Text>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
            </Mutation>
        )
    }

}

export default AddReservationScreen;