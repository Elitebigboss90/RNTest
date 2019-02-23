import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    DatePickerIOS,
    DatePickerAndroid,
    Platform
} from "react-native";
import PropTypes from "prop-types";

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { NavigationScreenProp } from "react-navigation";

import { Header } from "../../common/Header/Header";
import { Button } from "../../common/Button/Button";
import { nextIcon } from "../../static/imports/icons";
import styles from "./styles";
import console from "console";
//import console = require("console");



interface IProps {
    navigation: NavigationScreenProp<any, any>;
}

interface IState {
    name: string,
    hotelName: string,
    arrivalDate: Date,
    departureDate: Date,
    arrivalDateISO: string,
    departureDateISO: string,
    [key: string]: any
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

    public handleNavigation = () => (e: Event) => {
        const { navigation } = this.props;
        navigation.goBack()
    }

    public _handleMultiInput(stateName: string) {
        var id: string = stateName;
        return (text: string) => {
            var value: string = text;
            this.setState({ [id]: value })
        }
    }

    public _handleDateInput(stateName: string) {
        var name: string = stateName;
        return (selectedDate: Date) => {
            var value: Date = selectedDate;
            this.setState({ [name]: value })
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
        navigation.goBack()
    }

    public datePickerAndroid = (stateName: string) => async e => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date()
            });
            console.log("android", action)
            Alert.alert("here", date)
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                let dateString = (parseInt(month) + 1) + '/' + day + '/' + year;
                this.setState({ [stateName]: dateString })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }


    public datePickerController() {
        const { arrivalDate, departureDate } = this.state;
        return (
            <>
                {Platform.OS === 'ios' ? <><Text>Arrival Date</Text><DatePickerIOS
                    date={arrivalDate}
                    onDateChange={this._handleDateInput('arrivalDate')}
                    mode={'date'}
                /></> : <TouchableOpacity onPress={this.datePickerAndroid('arrivalDateISO')}><Text>Add ArrivalDate</Text></TouchableOpacity>}
                {Platform.OS === 'ios' ? <><Text>Departure Date</Text><DatePickerIOS
                    date={departureDate}
                    mode={'date'}
                    minimumDate={arrivalDate}
                    onDateChange={this._handleDateInput('departureDate')}
                /></> : <TouchableOpacity onPress={this.datePickerAndroid('departureDateISO')}><Text>Add Departure Date</Text></TouchableOpacity>}
            </>
        )
    }
    public _onSubmit = (mutation: any) => (e: Event) => {

        const { arrivalDate, departureDate, name, hotelName } = this.state;
        if (Platform.OS === 'ios') {
            let arrivalDateISO = this.getFormattedDate(arrivalDate);
            let departureDateISO = this.getFormattedDate(departureDate);

            this.setState({ arrivalDateISO, departureDateISO }, () => {
                if (name && hotelName && arrivalDateISO && departureDateISO)
                    mutation();
                else {
                    Alert.alert("Please Fill Out Blank(s)")
                }
            })
        } else {
            if (name && hotelName)
                mutation();
            else {
                Alert.alert("Please Fill Out Blank(s)")
            }
        }

    }

    public onError(error: any) {
        /**
         * TODO: ERROR HANDLER FOR GRAPHQL REQUEST FAILD
         */
    }

    public render() {
        const { name, hotelName, arrivalDateISO, departureDateISO } = this.state;

        return (
            <Mutation mutation={Add_Reservation} onError={this.onError} onCompleted={this._onCompleted} variables={{ name, hotelName, arrivalDate: arrivalDateISO, departureDate: departureDateISO }}>{PostMutation =>
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
                        {/**
                         *TODO:Add helper text to show the dates
                         */}
                        <TouchableOpacity onPress={this._onSubmit(PostMutation)}>
                            <Text>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
            </Mutation>
        )
    }

}

export default AddReservationScreen;