import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerIcon: {
        height: 24,
        width: 24,
        transform: [{ rotate: '90deg' }]
    },
    textColor: {
        color: 'black'
    },
    textInput: {
        height: 50,
        margin: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    }
});

export default styles;
