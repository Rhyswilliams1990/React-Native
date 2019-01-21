import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Header, Button, Form, Item, Input, Right, Text, Icon, Left, Body, Col, Grid } from 'native-base';
import { Actions } from 'react-native-gifted-chat';
import { queryLocationPermissions } from '../../actions';

class FindLocation extends Component {
    state={
        number: '',
        postcode: ''
    }
    async postcodeLookup(postcode, streetNo) {    
        try {
            this.setState({ postcode: postcode.toUpperCase() });
            const url = `https://maps.googleapis.com/maps/api/geocode/xml?address=${streetNo},${postcode}&sensor=false&key=AIzaSyCoLf5U9Z3FKXzl1suWJQyLB1CrYlpddMs`;
            
            const response = await fetch(url);
            if (response.ok) {
             // set user location based on geomtry
             // loop address_components for address
             
            } else {
                console.log(response);
            }          
        } catch (err) {
            console.log(err);
        }
    }

    useLocationButton() {        
        this.props.queryLocationPermissions();
        Actions.sellerLocation();       
    }

    render() {
        return (
            <Container>
                <Header>
                <Left>
                    <Icon onPress={() => Actions.pop()} name='arrow-back' />
                </Left>
                <Body>
                    <Text>Find Address</Text>
                </Body>
                </Header>
                <Content padder>
                    <Form>
                        <Item>
                            <Input                       
                                placeholder="Number"                        
                                onChangeText={(text) => {                        
                                    this.setState({ number: text });
                                }}
                                value={this.state.number}
                            />                                  
                        </Item>
                        <Item>
                            <Input                       
                                placeholder="Postcode"                        
                                onChangeText={(text) => {                        
                                this.setState({ postcode: text });
                                }}
                                value={this.state.postcode}
                            />
                        </Item>    
                    </Form> 
                    <Grid>
                        <Col style={{ paddingRight: 10 }}>
                            <Button light full onPress={this.useLocationButton.bind(this)}>
                                <Text>Use Location</Text>
                                <Right>
                                    <Icon name='location-searching' type='MaterialIcons' />
                                </Right>
                            </Button>
                        </Col> 
                        <Col style={{ paddingLeft: 10 }}>
                            <Button full>
                                <Text>Lookup Postcode</Text>
                                <Right>
                                    <Icon name='search' />
                                </Right>
                            </Button>
                        </Col>
                    </Grid>
                </Content>
            </Container>
        );
    }
}

export default connect(null, { queryLocationPermissions })(FindLocation);
