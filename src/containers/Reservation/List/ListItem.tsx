import React, { PureComponent } from "react";
import {
    Text,
    View,
    TouchableHighlight,
} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles"

interface IProps {
    item: any;
    onRowPress: any;
}

export class ListItem extends PureComponent<IProps> {
    public static propTypes = {
        item: PropTypes.any,
        onRowPress: PropTypes.func.isRequired
    }

    /**
   * On Row pressed event handler.
   */
    public onRowPress = () => {
        const { onRowPress } = this.props;

        onRowPress();
    };

    render() {
        const { name, date } = this.props.item.item;
        console.log(this.props)
        return (
            <TouchableHighlight onPress={this.onRowPress} style={styles.container}>
                <View>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.dateText}>{date}</Text>
                </View>
            </TouchableHighlight>

        )
    }
}