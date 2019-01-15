import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Text, ListItem, Body } from 'native-base';
//import { usersFetch } from '../actions';

class MessageList extends Component {
    constructor() {
        super();
        
        this.state = {
            data: [
                { name: 'Viewing Request', header: true },
                { name: 'Amy - 14/01/2018 14:00', header: false },
                { name: 'Amy - 14/01/2018 15:00', header: false },
                { name: 'Amy - 15/01/2018 14:00', header: false },
                { name: 'Query', header: true },
                { name: 'Amy - Pricing', header: false },
                { name: 'Amy - Possible Coal Deposit', header: false },
                { name: 'Floor Plan Appointment', header: true },
                { name: 'Steve - 19/01/2018 13:00', header: false }
            ],
            stickyHeaderIndices: []
        };
    }

    componentWillMount() {
        const arr = [];
        this.state.data.forEach(obj => {
            if (obj.header) {
                arr.push(this.state.data.indexOf(obj));
            }
        });
        arr.push(0);
        this.setState({
            stickyHeaderIndices: arr
        });
    }

    renderItem = ({ item }) => {
        if (item.header) {
            return (
                <ListItem itemDivider>
                    <Body>
                        <Text style={{ fontWeight: 'bold' }}>
                            {item.name}
                        </Text>
                    </Body>
                </ListItem>
            );
        } else if (!item.header) {
            return (
                <ListItem style={{ marginLeft: 0 }}>
                    <Body>
                        <Text>{item.name}</Text>
                    </Body>
                </ListItem>
            );
        }
    };

    render() {
        return (
            <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.name}
                stickyHeaderIndices={this.state.stickyHeaderIndices}
            />
        );
    }
}

export default MessageList;
