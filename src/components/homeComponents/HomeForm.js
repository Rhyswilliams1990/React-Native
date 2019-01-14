import React, { Component } from 'react';
import { FlatList } from "react-native";
import { Text, ListItem, Footer, Body, FooterTab, Icon, Button, Container } from "native-base";
//import { usersFetch } from '../actions';

class HomeForm extends Component {

    constructor() {
        super();
        
        this.state = {
            data: [
                { name: "Viewing Request", header: true },
                { name: "Amy - 14/01/2018 14:00", header: false },
                { name: "Amy - 14/01/2018 15:00", header: false },
                { name: "Amy - 15/01/2018 14:00", header: false },
                { name: "Query", header: true },
                { name: "Amy - Pricing", header: false },
                { name: "Amy - Possible Coal Deposit", header: false },
                { name: "Floor Plan Appointment", header: true },
                { name: "Steve - 19/01/2018 13:00", header: false }
            ],
            stickyHeaderIndices: []
        };
    }

    componentWillMount() {
        var arr = [];
        this.state.data.map(obj => {
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
                        <Text style={{ fontWeight: "bold" }}>
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

    renderScreen() {
        return (
            <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item.name}
            stickyHeaderIndices={this.state.stickyHeaderIndices}
        />
        );
    }

    render() {
        return (
            <Container>
                {this.renderScreen()}
                <Footer>
                    <FooterTab>
                        <Button light>
                            <Icon name="calendar-multiple-check" type="MaterialCommunityIcons" />
                        </Button>
                        <Button light active>
                            <Icon active  name="message-text-outline" type="MaterialCommunityIcons" />
                        </Button>
                        <Button light>
                            <Icon name="text-document" type="Entypo" />
                        </Button>
                        <Button light>
                            <Icon name="ios-swap" type="Ionicons" />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default HomeForm;