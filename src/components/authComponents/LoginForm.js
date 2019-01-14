import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { View, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser } from '../../actions';
import {  Root, Spinner, Button, Text, Container, Header, Content, Form, Item, Input, Label, Title, Body } from 'native-base';

class LoginForm extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                Actions.main({type:'reset'});
            }
        });
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onLoginButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }

    onCreateAccountButtonPress() {
        Actions.userCreate();
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner color='red' />;
        }

        return (
            <View style={{ padding: 10, paddingTop: 50 }} >
                <Button 
                    block 
                    primary 
                    onPress={this.onLoginButtonPress.bind(this)}
                    disabled={!this.props.email || !this.props.password}>
                    <Text>Login</Text>
                </Button>

                <View style={{ paddingTop: 5 }}>
                    <Button block info onPress={() => BackHandler.exitApp()}>
                        <Text>Quit</Text>
                    </Button>
                </View>

                <View style={{ paddingBottom: 5, paddingTop: 10 }}>
                    <Button transparent info small onPress={this.onCreateAccountButtonPress.bind(this)}>
                        <Text>Not a member? Create a account.</Text>
                    </Button>
                </View>
                <Button transparent info small>
                    <Text>Forgotten your password?</Text>
                </Button>
                {/* <Button transparent info small onPress={this.onLoginAsGazButtonPress.bind(this)}>
                    <Text>Login as Gaz</Text>
                </Button>
                <Button transparent info small onPress={this.onLoginAsRhysButtonPress.bind(this)}>
                    <Text>Login as Rhys</Text>
                </Button> */}
            </View>
        );
    }

    render() {
        return (
            <Root>
                <Container>
                    <Header>       
                        <Body>
                            <Title>Welcome, please login.</Title>
                        </Body>  
                    </Header>
                    
                    <Content>
                        <Form >
                            <Item floatingLabel>
                                <Label>E-Mail</Label>
                                <Input 
                                    onChangeText={this.onEmailChange.bind(this)} 
                                    value={this.props.email}
                                />
                            </Item>
                            
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input 
                                    onChangeText={this.onPasswordChange.bind(this)} 
                                    value={this.props.password} 
                                    secureTextEntry 
                                />
                            </Item>
                        </Form>
                     
                        {this.renderButton()}    
                        
                    </Content>
                </Container>
            </Root>
          );
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        loading: state.auth.loading
    };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
