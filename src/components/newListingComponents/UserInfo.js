import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Text, View, Button, FooterTab, Footer } from 'native-base';
import { connect } from 'react-redux';
import { onNewListingChange, saveNewListing } from '../../actions';

const FORENAME_FIELD = 'forename';
const SURNAME_FIELD = 'surname';
const EMAIL_FIELD = 'email';
const CONFIRM_EMAIL_FIELD = 'emailConfirmation';
const PHONE_FIELD = 'phone';
const PASSWORD_FIELD = 'password';
const CONFIRM_PASSWORD_FIELD = 'passwordConfirmation';

class UserInfo extends Component {

    onValueChange(prop, value) {
        this.props.onNewListingChange({ prop, value });
    }

    onContinuePress() {        
        this.props.saveNewListing(this.props.instruction);
    }

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
                            <Input 
                                onChangeText={this.onValueChange.bind(this, FORENAME_FIELD)}
                                placeholder='Forename(s)'
                                value={this.props.forename} 
                            />
                        </Item>
                        <Item>
                            <Input 
                                onChangeText={this.onValueChange.bind(this, SURNAME_FIELD)}
                                placeholder='Surname' 
                                value={this.props.surname} 
                            />
                        </Item>
                        <Item>
                            <Input 
                                onChangeText={this.onValueChange.bind(this, EMAIL_FIELD)}
                                placeholder='Email' 
                                value={this.props.email} 
                            />
                        </Item>
                        <Item>
                            <Input 
                                onChangeText={this.onValueChange.bind(this, CONFIRM_EMAIL_FIELD)}
                                placeholder='Confirm Email' 
                                value={this.props.emailConfirmation} 
                            />
                        </Item>
                        <Item>
                            <Input 
                                onChangeText={this.onValueChange.bind(this, PHONE_FIELD)}
                                keyboardType='number-pad' 
                                placeholder='Phone Number'
                                value={this.props.phoneNumber}  
                            />
                        </Item>
                        <Item>
                            <Input 
                                onChangeText={this.onValueChange.bind(this, PASSWORD_FIELD)}
                                secureTextEntry 
                                placeholder='Password' 
                                value={this.props.password} 
                            />
                        </Item>                        
                        <Item>
                            <Input 
                                onChangeText={this.onValueChange.bind(this, CONFIRM_PASSWORD_FIELD)}
                                secureTextEntry 
                                placeholder='Confirm Password' 
                                value={this.props.passwordConfirmation} 
                            />
                        </Item>
                    </Form>                   
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full onPress={this.onContinuePress.bind(this)}>
                            <Text>Continue</Text>    
                        </Button> 
                    </FooterTab>
                </Footer>
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

const mapStateToProps = state => {
    const { forename, 
        surname, 
        email, 
        emailConfirmation, 
        phoneNumber, 
        password, 
        passwordConfirmation } = state.newListing;

    return { forename, 
        surname, 
        email, 
        emailConfirmation, 
        phoneNumber, 
        password, 
        passwordConfirmation, 
        instruction: state.newListing };
};

export default connect(mapStateToProps, { onNewListingChange, saveNewListing })(UserInfo);
