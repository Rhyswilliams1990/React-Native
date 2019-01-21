import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast, Root, Container, Content, Header, Button, Form, Item, Input, Right, Text, Icon, Left, Body, Col, Grid } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { queryLocationPermissions } from '../../actions';

class FindLocation extends Component {
    state={
        number: '',
        postcode: ''
    }
   
    componentDidUpdate() {
        if (this.props.locationAllowed) {
            Actions.sellerLocation();
        }
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
    }
    postcodeButtonPressed() {
        const { number, postcode } = this.state;
        if (number === '' || postcode === '') {
            Toast.show({
                text: 'Number and postcode required',
                textStyle: { color: 'white' },
                buttonText: 'Okay',
                duration: 5000
            });
        } else {
            this.postcodeLookup(postcode, number);
        } 
    }
    render() {
        return (
            <Root>
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
                    <Text>{this.props.locationAllowed.toString()}</Text>
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
                            <Button full onPress={this.postcodeButtonPressed.bind(this)}>
                                <Text>Lookup Postcode</Text>
                                <Right>
                                    <Icon name='search' />
                                </Right>
                            </Button>
                        </Col>
                    </Grid>
                </Content>
            </Container>
            </Root>
        );
    }
}

const mapStateToProps = state => {
    const { locationAllowed } = state.globalSettings;
    console.log(locationAllowed);
    return { locationAllowed };
};


export default connect(mapStateToProps, { queryLocationPermissions })(FindLocation);
