import React, { PureComponent } from "react";
import {
    Text,
    TouchableHighlight,
} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles"

interface IProps {
    item: any;
    onPress: any;
}

export class ContactsRow extends PureComponent<IProps> {
    public static propTypes = {
        item: PropTypes.any,
        onPress: PropTypes.func.isRequired
    }

    /**
   * On Row pressed event handler.
   */
    public onRowPress = () => {
        const { onRowPress } = this.props;

        onRowPress();
    };

    render() {
        const { name, date } = this.props.item;
        return (
            <TouchableHighlight onPress={this.onRowPress} style={styles.container}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.dateText}>{date}</Text>
            </TouchableHighlight>
        )
    }
}