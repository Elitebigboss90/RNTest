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
    AsyncStorage,
    DatePickerIOS,
    DatePickerAndroid,
    Platform
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
    arrivalDate: Date,
    departureDate: Date,
    arrivalDateISO: string,
    departureDateISO: string
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
            arrivalDate: new Date(),
            departureDate: new Date(),
            arrivalDateISO: "",
            departureDateISO: "",

        }

        this._handleMultiInput = this._handleMultiInput.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
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

    public _handleDateInput(stateName: string) {
        return (selectedDate: Date) => {
            this.setState({ [stateName]: selectedDate })
        }

    }

    public getFormattedDate(date: Date) {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return month + '/' + day + '/' + year;
    }

    public _handleButton = () => {

    }

    _onCompleted = (data: any) => {
        const { navigation } = this.props;
        console.log("data", data);
        navigation.goBack()
    }

    public async datePickerAndroid(stateName: string) {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                let dateString = month + '/' + day + '/' + year;
                this._handleMultiInput(stateName)
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    public datePickerController() {
        const { arrivalDate, departureDate } = this.state;
        return (
            <>
                {Platform.OS === 'ios' ? <DatePickerIOS
                    date={arrivalDate}
                    onDateChange={this._handleDateInput('arrivalDate')}
                    mode={'date'}
                /> : this.datePickerAndroid('arrivalDate')}
                {Platform.OS === 'ios' ? <DatePickerIOS
                    date={departureDate}
                    mode={'date'}
                    onDateChange={this._handleDateInput('departureDate')}
                /> : this.datePickerAndroid('departureDate')}
            </>
        )
    }
    public _onSubmit = (mutation: any) => {
        const { arrivalDate, departureDate } = this.state;
        let arrivalDateISO = this.getFormattedDate(arrivalDate);
        let departureDateISO = this.getFormattedDate(departureDate);

        this.setState({ arrivalDateISO, departureDateISO }, () => {
            mutation();
        })


    }

    public render() {
        const { name, hotelName, arrivalDateISO, departureDateISO } = this.state;

        return (
            <Mutation mutation={Add_Reservation} onError={this.error} onCompleted={this._onCompleted} variables={{ name, hotelName, arrivalDate: arrivalDateISO, departureDate: departureDateISO }}>{PostMutation =>
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
                        {this.datePickerController()}
                        {/*<TextInput
                            style={styles.textInput}
                            onChangeText={this._handleMultiInput('arrivalDate')}
                            value={arrivalDate}
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={this._handleMultiInput('departureDate')}
                            value={departureDate}
                        />*/}
                        <TouchableOpacity onPress={() => this._onSubmit(PostMutation)}>
                            <Text>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
            </Mutation>
        )
    }

}

export default AddReservationScreen;