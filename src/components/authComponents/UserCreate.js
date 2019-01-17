import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { 
    Root, 
    Spinner, 
    Button, 
    Text, 
    Container, 
    Header, 
    Content, 
    Form, 
    Item, 
    Input, 
    Label, 
    Title, 
    Body, 
    Icon 
} from 'native-base';
import { userDetailUpdate, createUser, clearScreen } from '../../actions';

class LoginForm extends Component {
    state = { passwordIcon: '', passwordColor: '', emailIcon: '', emailColor: '' };
      
    componentWillReceiveProps(nextProps) {
        if (nextProps.email === '') {
            this.setState({ emailIcon: '', emailColor: '' });
        } else if (nextProps.emailValid) {
            this.setState({ emailIcon: 'checkmark-circle', emailColor: 'green' });
        } else if (!nextProps.emailValid) {
            this.setState({ emailIcon: 'close-circle', emailColor: 'red' });
        }  
        
        if (nextProps.password && nextProps.passwordRepeat) {
            if ((nextProps.password.length < 6) 
                    || (nextProps.password !== nextProps.passwordRepeat)) {
                this.setState({ passwordIcon: 'close-circle', passwordColor: 'red' });
            } else {
                this.setState({ passwordIcon: 'checkmark-circle', passwordColor: 'green' });
            }
        } else {
            this.setState({ passwordIcon: '', passwordColor: '' });
        }      
    }

    onCreateButtonPress() {
        const { email, password, username } = this.props;

        this.props.createUser({ email, password, username });
    }

    _isMounted = false;

    renderButton() {
        if (this.props.loading) {
            return <Spinner color='red' />;
        }

        return (
            <View>
                <Button 
                    block 
                    primary 
                    onPress={this.onCreateButtonPress.bind(this)}
                    disabled={
                        !this.props.email || 
                        !this.props.password || 
                        !this.props.passwordRepeat || 
                        !this.props.username ||
                        this.state.passwordColor === 'red' ||
                        !this.props.emailValid
                    }
                >
                    <Text>Create</Text>
                </Button>
                <View style={{ paddingTop: 5 }}>
                    <Button block info onPress={() => this.props.clearScreen()}>
                        <Text>Cancel</Text>
                    </Button>
                </View>
            </View>
        );
    }


    render() {
        return (
            <Root>
                <Container>
                    <Header>       
                        <Body>
                            <Title>Account Creation</Title>
                        </Body>  
                    </Header>
                    
                    <Content>
                        <Form >
                            <Item floatingLabel>
                                <Label>Display Name</Label>
                                <Input 
                                    onChangeText={value => 
                                        this.props.userDetailUpdate({ prop: 'username', value })}
                                    value={this.props.username}
                                />
                            </Item>

                            <Item floatingLabel>
                                <Label>E-Mail</Label>
                                <Input 
                                    onChangeText={value => 
                                        this.props.userDetailUpdate({ prop: 'email', value })}
                                    value={this.props.email}
                                />
                                <Icon 
                                    name={this.state.emailIcon} 
                                    style={{ color: this.state.emailColor }} 
                                />
                            </Item>
                            
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input 
                                    onChangeText={value => 
                                        this.props.userDetailUpdate({ prop: 'password', value })}
                                    value={this.props.password} 
                                    secureTextEntry 
                                />
                            </Item>

                            <Item floatingLabel>
                                <Label>Confirm</Label>
                                <Input 
                                    onChangeText={value => 
                                        this.props.userDetailUpdate({ 
                                            prop: 'passwordRepeat', value 
                                        })
                                    }
                                    value={this.props.passwordRepeat} 
                                    secureTextEntry 
                                />
                                <Icon 
                                    name={this.state.passwordIcon} 
                                    style={{ color: this.state.passwordColor }} 
                                />
                            </Item>
                            <View 
                                style={{ 
                                    flex: 1, 
                                    paddingTop: 10, 
                                    justifyContent: 'center', 
                                    alignItems: 'center'
                                }}
                            >
                                <Text 
                                    style={{ color: 'grey', fontSize: 10 }}
                                >  
                                    Passwords must be at least 6 characters.
                                </Text>
                            </View>
                        </Form>
                        
                        <View style={{ padding: 10, paddingTop: 40 }} >
                            {this.renderButton()}   
                        </View>
                    </Content>
                </Container>
            </Root>
        );
    }
}

const mapStateToProps = state => {
    const { username, email, password, passwordRepeat, emailValid, loading } = state.newUser;
    return { username, email, password, passwordRepeat, emailValid, loading };
};

export default connect(mapStateToProps, { 
    clearScreen,
    userDetailUpdate,
    createUser
 })(LoginForm);
