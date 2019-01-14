import React, { Component } from 'react';
import { FlatList } from "react-native";
import { Text, ListItem, Footer, Body, FooterTab, Icon, Button, Container } from "native-base";
import MessageListForm from './MessageListForm';
//import { usersFetch } from '../actions';

class HomeForm extends Component {
    renderScreen() {
        return (
            <MessageListForm />
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