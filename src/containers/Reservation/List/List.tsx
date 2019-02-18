import React, { PureComponent } from "react";
import {
    View,
    Text,
    FlatList
} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles"
import { NavigationScreenProp } from "react-navigation";
import { ListItem } from './ListItem'

interface IProps {
    data: object;
}

interface IState {

}

class List extends PureComponent {

    public static propTypes: any = {
        data: PropTypes.object,
    };

    /**
   * On Press each item event handler.
   */
    onRowPress = (item: object) => {
        //fetch details with item.id
    }

    /**
   * On Render each item event handler.
   */
    public onRenderItem = (item: object) => {
        return <ListItem item={item} onRowPress={this.onRowPress} />
    };

    public render() {
        const { data } = this.props;
        return (
            <FlatList
                data={data}
                renderItem={this.onRenderItem}
            />
        )
    }

}

export default List;