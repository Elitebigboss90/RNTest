import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        padding: 5
    },
    nameText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black'
    },
    dateText: {
        fontSize: 12,
        fontWeight: '500',
        color: 'grey'
    },
    icon: {
        width: 24,
        height: 24
    }
});

export default styles;
