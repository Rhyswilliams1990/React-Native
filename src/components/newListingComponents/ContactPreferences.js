import React, { Component } from 'react';
import { 
    Button, 
    Container, 
    Header, 
    Content, 
    Form, 
    Item, 
    Text, 
    DatePicker, 
    View, 
    CheckBox,
    Body, 
    ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';

class ContactPreferences extends Component {
    render() {
        return (<Container>
            <Header />
            <Content padder>
                <Form>
                    <Item>
                        <View style={{ paddingTop: 10 }} >
                            <View style={{ paddingBottom: 20 }} >
                                <Text>Whats the best day to contact you?</Text>
                            </View>
                            <DatePicker 
                                minimumDate={new Date()} 
                                locale={'en'}
                                placeHolderText="Select date"
                            />
                        </View>
                    </Item>
                    <View style={{ padding: 10 }} >
                        <Text>Contact Preferences</Text>
                        <ListItem>
                            <CheckBox disabled checked />
                            <Body>
                                <Text>Chat</Text>
                            </Body>                        
                        </ListItem>
                        <ListItem>
                            <CheckBox checked />
                            <Body>
                                <Text>Email</Text>
                            </Body> 
                        </ListItem>   
                        <ListItem>                    
                            <CheckBox checked />
                            <Body>
                                <Text>Phone</Text>
                            </Body>
                        </ListItem>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text>Contact Time</Text>
                        <ListItem>
                            <CheckBox checked />
                            <Body>
                                <Text>AM</Text>
                            </Body>                        
                        </ListItem>
                        <ListItem>
                            <CheckBox checked />
                            <Body>
                                <Text>PM</Text>
                            </Body>
                        </ListItem>
                    </View>
                    <Button full onPress={() => { Actions.userInfo(); }}>
                        <Text>Continue</Text>    
                    </Button> 
                </Form>
            </Content>
        </Container>);
    }
}

export default ContactPreferences;
