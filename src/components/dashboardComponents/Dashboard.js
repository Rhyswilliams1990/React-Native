import React, { Component } from 'react';
import { Footer, FooterTab, Icon, Button, Container } from 'native-base';
import CalendarForm from './CalendarForm';
import MessageList from './MessageList';
import HomeForm from './HomeForm';
import DocumentForm from './DocumentForm';
import OffersForm from './OffersForm';

const components = {
    calendarForm: CalendarForm,
    messageList: MessageList,
    homeForm: HomeForm,
    documentForm: DocumentForm,
    offersForm: OffersForm
};

class Dashboard extends Component {
    state = { buttonPressed: 'messageList' }

    renderScreen() {
        const DisplayComponent = components[this.state.buttonPressed];
        return (
            <DisplayComponent />
        );
    }

    render() {
        return (
            <Container>
                {this.renderScreen()}
                <Footer>
                    <FooterTab>
                        <Button 
                            light 
                            onPress={() => this.setState({ buttonPressed: 'calendarForm' })}
                            active={this.state.buttonPressed === 'calendarForm'}
                        >
                            <Icon 
                                name="calendar-multiple-check" 
                                type="MaterialCommunityIcons" 
                            />
                        </Button>
                        <Button 
                            light 
                            onPress={() => this.setState({ buttonPressed: 'messageList' })}
                            active={this.state.buttonPressed === 'messageList'}
                        >
                            <Icon 
                                name="message-text-outline" 
                                type="MaterialCommunityIcons" 
                            />
                        </Button>
                        <Button 
                            light 
                            onPress={() => this.setState({ buttonPressed: 'homeForm' })} 
                            active={this.state.buttonPressed === 'homeForm'}
                        >
                            <Icon 
                                name="home" 
                                type="MaterialCommunityIcons" 
                            />
                        </Button>
                        <Button 
                            light 
                            onPress={() => this.setState({ buttonPressed: 'documentForm' })} 
                            active={this.state.buttonPressed === 'documentForm'}
                        >
                            <Icon name="text-document" type="Entypo" />
                        </Button>
                        <Button 
                            light 
                            onPress={() => this.setState({ buttonPressed: 'offersForm' })} 
                            active={this.state.buttonPressed === 'offersForm'}
                        >
                            <Icon name="ios-swap" type="Ionicons" />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default Dashboard;
