import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Text, View, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

class UserInfo extends Component {
    render() {
        return (
            <Container>
                <Content padder>
                    <View style={styles.textContainerStyle}>
                        <Text style={styles.textExclamation}>Almost there!</Text>
                        <Text>Just a few more bits of information!</Text>
                    </View>
                    <Form>
                        
                        <Item>
                            <Input placeholder='Forename(s)' />
                        </Item>
                        <Item>
                            <Input placeholder='Surname' />
                        </Item>
                        <Item>
                            <Input placeholder='Email' />
                        </Item>
                        <Item>
                            <Input placeholder='Confirm Email' />
                        </Item>
                        <Item>
                            <Input keyboardType='number-pad' placeholder='Phone Number' />
                        </Item>
                        <Item>
                            <Input secureTextEntry placeholder='Password' />
                        </Item>                        
                        <Item>
                            <Input secureTextEntry placeholder='Confirm Password' />
                        </Item>
                    </Form>
                    <Button full onPress={() => { Actions.confirmation(); }}>
                        <Text>Continue</Text>    
                    </Button> 
                </Content>
            </Container>

        );        
    }
}

const styles = {
    textExclamation: {
        fontSize: 40,
        color: 'green',
        fontWeight: 'bold'
    }, 
    textContainerStyle: {        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
};

export default UserInfo;
