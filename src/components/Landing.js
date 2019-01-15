import React, { Component } from 'react';
import { Dimensions, ImageBackground } from 'react-native';
import { Button, Text, Container, Content, StyleProvider } from 'native-base';
import { Actions } from 'react-native-router-flux';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/commonColor';


const image = require('../../assets/images/background.jpg');

class Landing extends Component {
    onLoginPress() {
        Actions.auth();
    }
    onSellPress() {
        
    }
    render() {
        const { contentStyle, buttonStyle, lightTextStyle } = styles;

        const { height, width } = Dimensions.get('window');
        
        return (            
            <ImageBackground 
            source={image} 
            style={{ width, height }}
            >
                <StyleProvider style={getTheme(material)}>
                    <Container style={{ backgroundColor: 'transparent' }}>
                        <Content contentContainerStyle={contentStyle}>
                            <Button 
                                primary 
                                style={buttonStyle}
                                onPress={this.onSellPress.bind(this)}
                            >
                                <Text>Sell with Us!</Text>
                            </Button>
                            <Button light style={buttonStyle}>
                                <Text style={lightTextStyle}>About Us</Text>
                            </Button>
                            <Button 
                                light 
                                style={buttonStyle} 
                                onPress={this.onLoginPress.bind(this)}
                                disabled={false}
                            >
                                <Text style={lightTextStyle}>Login</Text>
                            </Button>
                        </Content>
                    </Container>
                </StyleProvider>
            </ImageBackground>
        );
    }
}

const styles = {
    contentStyle: {
        justifyContent: 'space-evenly',
        flex: 1,
        flexDirection: 'column'
    },
    buttonStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 200,
        alignItems: 'center'
    },
    lightTextStyle: {
        color: 'black'
    }
};

export default Landing;
