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
                    <FooterTab style={styles.footerTabStyle}>
                        <Button 
                            transparent 
                            onPress={() => this.setState({ buttonPressed: 'calendarForm' })}
                        >
                            <Icon 
                                style={styles.iconStyle}
                                name="calendar-multiple-check" 
                                type="MaterialCommunityIcons" 
                            />
                        </Button>
                        <Button 
                            transparent 
                            onPress={() => this.setState({ buttonPressed: 'messageList' })}
                        >
                            <Icon 
                                style={styles.iconStyle}
                                name="message-text-outline" 
                                type="MaterialCommunityIcons" 
                            />
                        </Button>
                        <Button 
                            transparent 
                            onPress={() => this.setState({ buttonPressed: 'homeForm' })} 
                        >
                            <Icon 
                                style={styles.iconStyle} 
                                name="home" 
                                type="MaterialCommunityIcons" 
                            />
                        </Button>
                        <Button 
                            transparent 
                            onPress={() => this.setState({ buttonPressed: 'documentForm' })} 
                        >
                            <Icon 
                               style={styles.iconStyle} name="text-document" type="Entypo" />
                        </Button>
                        <Button 
                            transparent 
                            onPress={() => this.setState({ buttonPressed: 'offersForm' })} 
                            
                        >
                            <Icon 
                                style={styles.iconStyle} name="ios-swap" type="Ionicons" />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = {
    iconStyle: {
        color: '#27bfb3',
        fontSize: 30
    },
    footerTabStyle: {
        backgroundColor: 'white',
        borderTopWidth: 2,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,

    }
};
export default Dashboard;
